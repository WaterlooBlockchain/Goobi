import { TransactionInstruction, AccountMeta, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";

const CHONKYPublicKey = new PublicKey('H7ed7UgcLp3ax4X1CQ5WuWDn6d1pprfMMYiv5ejwLWWU');

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
);

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

const ID = new PublicKey('Bte42WiWWCy6uWtMqRZ13er18p9Kden4a29DNrEUZ8sh');

export default async function initChonkyHoldingAccount(fanout: PublicKey, authority: PublicKey) {
    const instructions: TransactionInstruction[] = [];
    const CHONKYTokenAccount = findAssociatedTokenAddress(fanout, CHONKYPublicKey);
  
    instructions.push(
      createAssociatedTokenAccountInstruction(
        CHONKYTokenAccount,
        authority,
        fanout,
        CHONKYPublicKey,
      ),
    );

    
    return {
        output: {
            tokenAccount: CHONKYTokenAccount,
        },
        instructions
    };
}