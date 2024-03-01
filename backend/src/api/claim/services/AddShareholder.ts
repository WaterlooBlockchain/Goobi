import { Connection, SYSVAR_RENT_PUBKEY, TransactionInstruction } from "@solana/web3.js";

import * as splToken from '@solana/spl-token';
import {PublicKey, SystemProgram, AccountMeta} from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import { fanoutMembershipVoucherBeet } from "./fanoutMembershipVoucherStruct";

export type AddMemberArgs = {
  shares: beet.bignum;
};

/**
 * @category userTypes
 * @category generated
 */
export const addMemberArgsBeet = new beet.BeetArgsStruct<AddMemberArgs>(
  [['shares', beet.u64]],
  'AddMemberArgs',
);
export type ProcessAddMemberWalletInstructionArgs = {
  args: AddMemberArgs;
};
/**
 * @category Instructions
 * @category ProcessAddMemberWallet
 * @category generated
 */
export const processAddMemberWalletStruct = new beet.BeetArgsStruct<
  ProcessAddMemberWalletInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', addMemberArgsBeet],
  ],
  'ProcessAddMemberWalletInstructionArgs',
);
/**
 * Accounts required by the _processAddMemberWallet_ instruction
 *
 * @property [_writable_, **signer**] authority
 * @property [] member
 * @property [_writable_] fanout
 * @property [_writable_] membershipAccount
 * @category Instructions
 * @category ProcessAddMemberWallet
 * @category generated
 */
export type ProcessAddMemberWalletInstructionAccounts = {
  authority: PublicKey;
  member: PublicKey;
  fanout: PublicKey;
  membershipAccount: PublicKey;
};

export const processAddMemberWalletInstructionDiscriminator = [201, 9, 59, 128, 69, 117, 220, 235];

/**
 * Creates a _ProcessAddMemberWallet_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category ProcessAddMemberWallet
 * @category generated
 */
export function createProcessAddMemberWalletInstruction(
  accounts: ProcessAddMemberWalletInstructionAccounts,
  args: ProcessAddMemberWalletInstructionArgs,
) {
  const { authority, member, fanout, membershipAccount } = accounts;

  const [data] = processAddMemberWalletStruct.serialize({
    instructionDiscriminator: processAddMemberWalletInstructionDiscriminator,
    ...args,
  });
  const keys: AccountMeta[] = [
    {
      pubkey: authority,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: member,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: fanout,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: membershipAccount,
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
      pubkey: splToken.TOKEN_PROGRAM_ID,
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

const ID = new PublicKey('Bte42WiWWCy6uWtMqRZ13er18p9Kden4a29DNrEUZ8sh');

export default async function addShareHolderInstructions(connection: Connection, authority: PublicKey, fanout: PublicKey) {
    const instructions: TransactionInstruction[] = [];

    const [membershipVoucher, _vb] = PublicKey.findProgramAddressSync(
        [Buffer.from('fanout-membership'), fanout.toBuffer(), authority.toBuffer()],
        ID,
    );

    let { data } = (await connection.getAccountInfo(membershipVoucher)) || {};
    if (data) {
      return;
    }

    instructions.push(
      createProcessAddMemberWalletInstruction(
        {
          authority: authority,
          fanout: fanout,
          membershipAccount: membershipVoucher,
          member: authority,
        },
        {
          args: {
            shares: 10000,
          },
        },
      ),
    );

    return {
      output: {
        membershipVoucher,
      },
      instructions,
    };
}