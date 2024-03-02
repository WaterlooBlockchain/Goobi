import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js"
import { Text, TouchableOpacity, View } from "react-native";
import { createTransferCheckedInstruction, getAssociatedTokenAddress } from '@solana/spl-token';
import { useWallet } from "@solana/wallet-adapter-react";

type SendProps = {
    targetAddress: string;
}
export default function Burn({targetAddress}: SendProps) {
    const source = Keypair.generate();
    const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=8697a03d-1b82-4a95-8c90-265a63350d15');
    const mint = new PublicKey('J8yxhrGonPFBJuTpn5Pa45hpfR4ij3kEw483BPAv3miT');

    const wallet = useWallet();

    const burn = async () => {
        if (wallet.publicKey) {
            const tx = new Transaction();
            const Blockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
    
            tx.feePayer = wallet.publicKey;
            tx.recentBlockhash = Blockhash;
            // @ts-ignore
            const signedTransaction = await wallet.signTransaction(tx);
    
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());        
        } else {
            // @ts-ignore
            await wallet.signIn();
        }
    }

    return (
        <>
            <View>
                <TouchableOpacity onPress={burn}>
                    <Text>Burn</Text>    
                </TouchableOpacity>                
            </View>
        </>
    )
}