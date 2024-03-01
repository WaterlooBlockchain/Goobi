import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";

import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { fanoutMembershipVoucherBeet } from "./fanoutMembershipVoucherStruct";

export type ProcessTransferSharesInstructionArgs = {
  shares: beet.bignum;
};

export const processTransferSharesStruct = new beet.BeetArgsStruct<
  ProcessTransferSharesInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['shares', beet.u64],
  ],
  'ProcessTransferSharesInstructionArgs',
);

export type ProcessTransferSharesInstructionAccounts = {
  authority: web3.PublicKey;
  fromMember: web3.PublicKey;
  toMember: web3.PublicKey;
  fanout: web3.PublicKey;
  fromMembershipAccount: web3.PublicKey;
  toMembershipAccount: web3.PublicKey;
};

export const processTransferSharesInstructionDiscriminator = [195, 175, 36, 50, 101, 22, 28, 87];

export function createProcessTransferSharesInstruction(
  accounts: ProcessTransferSharesInstructionAccounts,
  args: ProcessTransferSharesInstructionArgs,
) {
  const { authority, fromMember, toMember, fanout, fromMembershipAccount, toMembershipAccount } =
    accounts;

  const [data] = processTransferSharesStruct.serialize({
    instructionDiscriminator: processTransferSharesInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: authority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: fromMember,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: toMember,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: fanout,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: fromMembershipAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: toMembershipAccount,
      isWritable: true,
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

const ID = new PublicKey('Bte42WiWWCy6uWtMqRZ13er18p9Kden4a29DNrEUZ8sh');

export default async function transferSharesInstructions(connection: Connection, shareHolder: PublicKey, fanout: PublicKey, member: PublicKey) {
    const instructions: TransactionInstruction[] = [];

    const [fromMembershipAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from('fanout-membership'), fanout.toBuffer(), shareHolder.toBuffer()],
      ID,
    );

    const [membershipVoucher] = PublicKey.findProgramAddressSync(
      [Buffer.from('fanout-membership'), fanout.toBuffer(), member.toBuffer()],
      ID,
    );

    let { data } = (await connection.getAccountInfo(membershipVoucher)) || {};
    if (data) {
      const deserialize = fanoutMembershipVoucherBeet.deserialize(data)[0];
      if (deserialize.shares.toNumber() >= 1 ) {
        return;
      }
    }

    instructions.push(
      createProcessTransferSharesInstruction(
        {
          fromMember: shareHolder,
          toMember: member,
          authority: shareHolder,
          fanout: fanout,
          fromMembershipAccount: fromMembershipAccount,
          toMembershipAccount: membershipVoucher,
        },
        {
          shares: 1,
        },
      ),
    );
    return {
      output: {},
      instructions,
    };
  }