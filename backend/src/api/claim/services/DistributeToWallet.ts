import { PublicKey, TransactionInstruction, Connection, AccountMeta, SYSVAR_RENT_PUBKEY, SystemProgram } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import * as beet from '@metaplex-foundation/beet';

const ID = new PublicKey('Bte42WiWWCy6uWtMqRZ13er18p9Kden4a29DNrEUZ8sh');

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL')


export type ProcessDistributeWalletInstructionArgs = {
  distributeForMint: boolean;
};

export const processDistributeWalletStruct = new beet.BeetArgsStruct<
  ProcessDistributeWalletInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['distributeForMint', beet.bool],
  ],
  'ProcessDistributeWalletInstructionArgs',
);

export type ProcessDistributeWalletInstructionAccounts = {
  payer: PublicKey;
  member: PublicKey;
  membershipVoucher: PublicKey;
  fanout: PublicKey;
  holdingAccount: PublicKey;
  fanoutForMint: PublicKey;
  fanoutForMintMembershipVoucher: PublicKey;
  fanoutMint: PublicKey;
  fanoutMintMemberTokenAccount: PublicKey;
};

export const processDistributeWalletInstructionDiscriminator = [
  252, 168, 167, 66, 40, 201, 182, 163,
];

export function createProcessDistributeWalletInstruction(
  accounts: ProcessDistributeWalletInstructionAccounts,
  args: ProcessDistributeWalletInstructionArgs,
) {
  const {
    payer,
    member,
    membershipVoucher,
    fanout,
    holdingAccount,
    fanoutForMint,
    fanoutForMintMembershipVoucher,
    fanoutMint,
    fanoutMintMemberTokenAccount,
  } = accounts;

  const [data] = processDistributeWalletStruct.serialize({
    instructionDiscriminator: processDistributeWalletInstructionDiscriminator,
    ...args,
  });
  const keys: AccountMeta[] = [
    {
      pubkey: payer,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: member,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: membershipVoucher,
      isWritable: true,
      isSigner: false,
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
      pubkey: fanoutForMint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: fanoutForMintMembershipVoucher,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: fanoutMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: fanoutMintMemberTokenAccount,
      isWritable: true,
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
    {
      pubkey: TOKEN_PROGRAM_ID,
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

export default async function distributeToWallet(connection: Connection, fanout: PublicKey, member: PublicKey) {
    const CHONKYPublicKey = new PublicKey('H7ed7UgcLp3ax4X1CQ5WuWDn6d1pprfMMYiv5ejwLWWU');

    const instructions: TransactionInstruction[] = [];

    const [fanoutForMint] = PublicKey.findProgramAddressSync(
        [Buffer.from('fanout-config'), fanout.toBuffer(), CHONKYPublicKey.toBuffer()],
        ID,
      );

    const [fanoutForMintMembershipVoucher] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('fanout-membership'),
          fanoutForMint.toBuffer(),
          member.toBuffer(),
          CHONKYPublicKey.toBuffer(),
        ],
        ID,
      );

      const [holdingAccount] = PublicKey.findProgramAddressSync(
        [
            fanout.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            CHONKYPublicKey.toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );

    const [fanoutMintMemberTokenAccount] = PublicKey.findProgramAddressSync(
        [
            member.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            CHONKYPublicKey.toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );

    try {
      await connection.getTokenAccountBalance(fanoutMintMemberTokenAccount);
    } catch (e) {
            instructions.push(
                createAssociatedTokenAccountInstruction(
                fanoutMintMemberTokenAccount,
                member,
                member,
                CHONKYPublicKey
            ),
        );
    }

    const [membershipVoucher] = PublicKey.findProgramAddressSync(
        [Buffer.from('fanout-membership'), fanout.toBuffer(), member.toBuffer()],
        ID,
      );

      instructions.push(
        createProcessDistributeWalletInstruction(
          {
            fanoutForMint: fanoutForMint,
            fanoutMint: CHONKYPublicKey,
            membershipVoucher: membershipVoucher,
            fanoutForMintMembershipVoucher: fanoutForMintMembershipVoucher,
            holdingAccount: holdingAccount,
            fanoutMintMemberTokenAccount: fanoutMintMemberTokenAccount,
            payer: member,
            member: member,
            fanout: fanout,
          },
          {
            distributeForMint: true,
          },
        ),
      );
  
      return {
        output: {
          membershipVoucher,
          fanoutForMintMembershipVoucher,
          holdingAccount,
        },
        instructions,
      };  
}