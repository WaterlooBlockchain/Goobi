import { Keypair, PublicKey, Connection, Signer, LAMPORTS_PER_SOL, SystemProgram, Account, Transaction, SYSVAR_RENT_PUBKEY, TransactionInstruction } from "@solana/web3.js";
import { AnchorProvider, BN, Idl, Program, Wallet } from "@coral-xyz/anchor";
import * as idl from './hydra_idl.json';

import * as splToken from '@solana/spl-token';
import * as beet from '@metaplex-foundation/beet';
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import * as web3 from '@solana/web3.js';

export enum MembershipModel {
    Wallet,
    Token,
    NFT,
  }

export const membershipModelBeet = beet.fixedScalarEnum(MembershipModel) as beet.FixedSizeBeet<
  MembershipModel,
  MembershipModel
>;
  
export type ProcessInitInstructionArgs = {
  args: InitializeFanoutArgs;
  model: MembershipModel;
};

export type InitializeFanoutArgs = {
    bumpSeed: number;
    nativeAccountBumpSeed: number;
    name: string;
    totalShares: beet.bignum;
};

export const initializeFanoutArgsBeet = new beet.FixableBeetArgsStruct<InitializeFanoutArgs>(
    [
        ['bumpSeed', beet.u8],
        ['nativeAccountBumpSeed', beet.u8],
        ['name', beet.utf8String],
        ['totalShares', beet.u64],
    ],
    'InitializeFanoutArgs',
);

export const processInitStruct = new beet.FixableBeetArgsStruct<
  ProcessInitInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', initializeFanoutArgsBeet],
    ['model', membershipModelBeet],
  ],
  'ProcessInitInstructionArgs',
);

export type ProcessInitInstructionAccounts = {
  authority: web3.PublicKey;
  fanout: web3.PublicKey;
  holdingAccount: web3.PublicKey;
  membershipMint: web3.PublicKey;
};

export const processInitInstructionDiscriminator = [172, 5, 165, 143, 86, 159, 50, 237];

export function createProcessInitInstruction(
  accounts: ProcessInitInstructionAccounts,
  args: ProcessInitInstructionArgs,
) {
  const { authority, fanout, holdingAccount, membershipMint } = accounts;

  const [data] = processInitStruct.serialize({
    instructionDiscriminator: processInitInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: authority,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: fanout,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: holdingAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: membershipMint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: web3.SYSVAR_RENT_PUBKEY,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId: new web3.PublicKey('Bte42WiWWCy6uWtMqRZ13er18p9Kden4a29DNrEUZ8sh'),
    keys,
    data,
  });
  return ix;
}

export default async function initFanoutWallet(connection: Connection) {
  const name = 'GET CHONKY SAGA V1';

  const authority = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(process.env.AUTHORITY))
  );  

  const wallet: Wallet = {
    //@ts-ignore
    signTransaction: async (transaction: Transaction) => {
      const signedTransaction: Transaction = await transact(async (wallet) => {
        const transactions: Transaction[] = await wallet.signTransactions({
          transactions: [transaction],
        });
        return transactions[0];
      });
      return signedTransaction;
    },
    //@ts-ignore
    signAllTransactions: async (transactions: Transaction[]) => {
      const signedTransactions: Transaction[] = await transact(async (wallet) => {
        // Construct a transaction then request for signing
        const tx: Transaction[] = await wallet.signTransactions({
          transactions: transactions
        });

        return transactions;
      });
      return signedTransactions;
    },
    publicKey: authority.publicKey,
    payer: authority,
  };

  const provider = new AnchorProvider(connection, wallet, {preflightCommitment: 'confirmed', commitment: 'confirmed'});

  const program = new Program(
    idl as Idl,
    'Bte42WiWWCy6uWtMqRZ13er18p9Kden4a29DNrEUZ8sh',
    provider,
  ) as Program; 


  const [fanoutConfig, fanoutConfigBumpSeed] = PublicKey.findProgramAddressSync(
    [Buffer.from('fanout-config'), Buffer.from(name)],
    program.programId,
  );
  
  const [holdingAccount, holdingAccountBumpSeed] = PublicKey.findProgramAddressSync(
    [Buffer.from('fanout-native-account'), fanoutConfig.toBuffer()],
    program.programId,
  );

    const instructions: TransactionInstruction[] = [];
    const SAGAPublicKey = new PublicKey('46pcSL5gmjBrPqGKFaLbbCmR6iVuLJbnQy13hAe7s6CC');

    instructions.push(
      createProcessInitInstruction(
        {
          authority: authority.publicKey,
          holdingAccount: holdingAccount,
          fanout: fanoutConfig,
          membershipMint: SAGAPublicKey,
        },
        {
          args: {
            bumpSeed: fanoutConfigBumpSeed,
            nativeAccountBumpSeed: holdingAccountBumpSeed,
            totalShares: 10000,
            name: name,
          },
          model: MembershipModel.Wallet,
        },
      ),
    );
    return {
      output: {
        fanout: fanoutConfig,
        nativeAccount: holdingAccount,
      },
      instructions,
      authority,
    };
  }