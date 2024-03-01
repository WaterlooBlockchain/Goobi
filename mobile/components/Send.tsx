import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js"
import { Text, TouchableOpacity, View } from "react-native";
import { createTransferCheckedInstruction, getAssociatedTokenAddress } from '@solana/spl-token';

type SendProps = {
    targetAddress: string;
}
export default function Send({targetAddress}: SendProps) {
    const source = Keypair.generate();
    const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=8697a03d-1b82-4a95-8c90-265a63350d15');
    const mint = new PublicKey('J8yxhrGonPFBJuTpn5Pa45hpfR4ij3kEw483BPAv3miT');

    const send = async () => {
        const sourceTokenAddress = await getAssociatedTokenAddress(mint, source.publicKey);
        const toTokenAddress = await getAssociatedTokenAddress(mint, new PublicKey(targetAddress));

        const transferInstruction = createTransferCheckedInstruction(sourceTokenAddress, mint, toTokenAddress, source.publicKey, 100000, 6);
        const tx = new Transaction().add(transferInstruction);

        tx.feePayer = source.publicKey;
        tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
        console.log(toTokenAddress.toString());
    }

    return (
        <>
            <View>
                <TouchableOpacity onPress={send}>
                    <Text>Send</Text>    
                </TouchableOpacity>                
            </View>
        </>
    )
}