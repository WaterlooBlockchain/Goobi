import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { factories } from '@strapi/strapi';
import initFanoutWallet from '../services/InitFanout';
import addMemberWalletInstruction from '../services/AddMemberWallet';
import transferSharesInstructions from '../services/TransferShares';
import distributeToWallet from '../services/DistributeToWallet';
import { burnChecked, getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID} from '@solana/spl-token';

export default factories.createCoreService('api::claim.claim', ({ strapi }) => ({

  async initClaim(ctx: any) {
    const tx = new Transaction();
    const { publicKey } = ctx.request.body;
    const url = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_APIKEY}`
    const connection = new Connection(url, 'confirmed');

    const { output: fanoutWallet, authority: authority} = await initFanoutWallet(connection); 
    
    const addMember = await addMemberWalletInstruction(connection, authority.publicKey, fanoutWallet.fanout, new PublicKey(publicKey));
    if (addMember?.instructions) {
      tx.add(...addMember.instructions);
    }

    const transferShareInstruction = await transferSharesInstructions(connection, authority.publicKey, fanoutWallet.fanout, new PublicKey(publicKey));
    if (transferShareInstruction?.instructions) {
      tx.add(...transferShareInstruction.instructions);
    }

    const { instructions: distributeInstructions } = await distributeToWallet(connection, fanoutWallet.fanout, new PublicKey(publicKey))
    tx.add(...distributeInstructions);

    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.feePayer = new PublicKey(publicKey);

    tx.partialSign(authority);

    const serializedTransaction = tx.serialize({
      requireAllSignatures: false,
    });

    return serializedTransaction.toString('base64');
  },
  async burn(ctx: any) {
    const { publicKey } = new ctx.request.body;
    const { amount } = new ctx.request.body;
    const url = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_APIKEY}`
    const connection = new Connection(url, 'confirmed');
    const mint = new PublicKey('J8yxhrGonPFBJuTpn5Pa45hpfR4ij3kEw483BPAv3miT');
    const source = getAssociatedTokenAddressSync(new PublicKey(publicKey), mint);
    const signer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.SIGNER)));

    const transactionSignature = await burnChecked(
      connection,
      signer, 
      source,
      mint, 
      new PublicKey(publicKey),
      amount,
      6,
      undefined, 
      undefined,
      TOKEN_2022_PROGRAM_ID
    );
  
    return { transactionSignature };
  }
}))