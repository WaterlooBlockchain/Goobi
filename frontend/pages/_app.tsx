// _app.tsx

import "@/styles/globals.css";
import type { AppProps } from 'next/app';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useMemo } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";

export default function App({ Component, pageProps}: AppProps) {
    const network = 'https://mainnet.helius-rpc.com/?api-key=04d3dbd0-f430-4de3-97e4-dfe75a51ae0d';
    const endpoint = useMemo(() => network, [network]);

    const wallets = useMemo(
        () => [
          new SolflareWalletAdapter(),
          new PhantomWalletAdapter()
        ],
        [network]
    );
    
    return (
        <>
            <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                <Component {...pageProps} />
                    </WalletModalProvider>
                </WalletProvider>
        </ConnectionProvider>

        </>
    )
}