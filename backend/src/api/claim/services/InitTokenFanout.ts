import { TransactionInstruction, AccountMeta, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import * as beet from '@metaplex-foundation/beet';

const CHONKYPublicKey = new PublicKey('H7ed7UgcLp3ax4X1CQ5WuWDn6d1pprfMMYiv5ejwLWWU');

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
);
  
const ID = new PublicKey('Bte42WiWWCy6uWtMqRZ13er18p9Kden4a29DNrEUZ8sh');


export type ProcessInitForMintInstructionArgs = {
  bumpSeed: number;
};

export const processInitForMintStruct = new beet.BeetArgsStruct<
  ProcessInitForMintInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['bumpSeed', beet.u8],
  ],
  'ProcessInitForMintInstructionArgs',
);

export type ProcessInitForMintInstructionAccounts = {
  authority: PublicKey;
  fanout: PublicKey;
  fanoutForMint: PublicKey;
  mintHoldingAccount: PublicKey;
  mint: PublicKey;
};

export const processInitForMintInstructionDiscriminator = [140, 150, 232, 195, 93, 219, 35, 170];

export function createChonkyFanoutInstruction(
  accounts: ProcessInitForMintInstructionAccounts,
  args: ProcessInitForMintInstructionArgs,
) {
  const { authority, fanout, fanoutForMint, mintHoldingAccount, mint } = accounts;

  const [data] = processInitForMintStruct.serialize({
    instructionDiscriminator: processInitForMintInstructionDiscriminator,
    ...args,
  });
  const keys: AccountMeta[] = [
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
      pubkey: fanoutForMint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: mintHoldingAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: mint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: SYSVAR_RENT_PUBKEY,
      isWritable: false,
      isSigner: false,
    },
  ];

  const ix = new TransactionInstruction({
    programId: new PublicKey('Bte42WiWWCy6uWtMqRZ13er18p9Kden4a29DNrEUZ8sh'),
    keys,
    data,
  });
  return ix;
}

function findAssociatedTokenAddress(
      walletAddress: PublicKey,
      tokenMintAddress: PublicKey
  ): PublicKey {
    return PublicKey.findProgramAddressSync(
        [
            walletAddress.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            tokenMintAddress.toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )[0];
}

function createAssociatedTokenAccountInstruction(
  associatedTokenAddress: PublicKey,
  payer: PublicKey,
  walletAddress: PublicKey,
  splTokenMintAddress: PublicKey,
) {
  const keys = [
    {
      pubkey: payer,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: associatedTokenAddress,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: walletAddress,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: splTokenMintAddress,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: SYSVAR_RENT_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
  ];
  return new TransactionInstruction({
    keys,
    programId: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    data: Buffer.from([]),
  });
}  

async function fanoutForMintKey(
    fanout: PublicKey,
    mint: PublicKey,
    programId: PublicKey = ID,
  ): Promise<[PublicKey, number]> {
    return await PublicKey.findProgramAddressSync(
      [Buffer.from('fanout-config'), fanout.toBuffer(), mint.toBuffer()],
      programId,
    );
  }


export default async function initFanoutChonky(fanout: PublicKey, authority: PublicKey) {
    const instructions: TransactionInstruction[] = [];
    const CHONKYTokenAccount = findAssociatedTokenAddress(fanout, CHONKYPublicKey);

    const [fanoutMintConfig, fanoutConfigBumpSeed] = await fanoutForMintKey(
        fanout,
        CHONKYPublicKey,
      );
  
    instructions.push(
        createChonkyFanoutInstruction(
        {
          authority: authority,
          mintHoldingAccount: CHONKYTokenAccount,
          fanout: fanout,
          mint: CHONKYPublicKey,
          fanoutForMint: fanoutMintConfig,
        },
        {
          bumpSeed: fanoutConfigBumpSeed,
        },
      ),
    );
    
    return {
        output: {
            tokenAccount: CHONKYTokenAccount,
            fanoutForMint: fanoutMintConfig,
        },
        instructions
    };
}