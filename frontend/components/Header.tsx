import { Montserrat } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import transparentGoose from "../public/transparent_goose.png"
import waterlooBlockchainLogo from '../public/waterloo_blockchain_logo.png'
import Merch from './Merch';

const inter = Montserrat({ subsets: ["latin"] });

export default function Header() {
  return (
<header className="flex justify-between items-center px-8 lg:px-64 py-12">
      <div className="flex flex-row items-center justify-center">
        <Image src={transparentGoose} alt="Mr. Goose" width={100} height={100} />
        <Image src={waterlooBlockchainLogo} alt="Mr. Goose" width={150} height={100} />
      </div>
      <nav className="flex space-x-4">
        <Link href="/events" passHref  legacyBehavior>
          <a className="text-lg lg:text-2xl text-yellow-200 font-bold hover:text-yellow-500 underline">Events</a>
        </Link>
        <Link href="/merch" passHref  legacyBehavior>
          <a className="text-lg lg:text-2xl text-yellow-200 font-bold  hover:text-yellow-500 underline">Merch</a>
        </Link>
      </nav>
    </header>
  )
}
