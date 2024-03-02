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
    const network = 'https://nextjs.org/docs/messages/next-image-upgrade-to-13';
    console.log(network)
    const endpoint = useMemo(() => network, [network]);
    console.log(endpoint)


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