import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { factories } from '@strapi/strapi';
import initFanoutWallet from '../services/InitFanout';
import addMemberWalletInstruction from '../services/AddMemberWallet';
import transferSharesInstructions from '../services/TransferShares';
import distributeToWallet from '../services/DistributeToWallet';

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
}))