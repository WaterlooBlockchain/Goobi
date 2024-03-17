import Link from "next/link";
import Image from "next/image";
import transparentGoose from "../public/transparent_goose.png"
import waterlooBlockchainLogo from '../public/waterloo_blockchain_logo.png'
import Merch from './Merch';
import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);
export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 lg:px-64 py-12">
      <div className="flex flex-row items-center justify-center">
        <Image src={transparentGoose} alt="Mr. Goose" width={100} height={100} />
        <Image src={waterlooBlockchainLogo} alt="Mr. Goose" width={150} height={100} />
      </div>
        <WalletMultiButtonDynamic />
    </header>
  )
}
