import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import mrgoose from "../../public/mr-goose.jpg"
import Merch from '@/components/Merch';

const inter = Inter({ subsets: ["latin"] });

export default function Header() {
  return (
<header className="flex justify-between items-center p-6 ">
      <div className="flex items-center">
        <Image src={mrgoose} alt="Mr. Goose" width={50} height={50} />
        <h1 className="text-lg text-white font-bold ml-2">MR GOOSE</h1>
      </div>
      <nav className="flex space-x-4">
        <Link href="/events" passHref  legacyBehavior>
          <a className="text-white hover:text-gray-600">Events</a>
        </Link>
        <Link href="/merch" passHref  legacyBehavior>
          <a className="text-white hover:text-gray-600">Merch</a>
        </Link>
      </nav>
    </header>
  )
}
