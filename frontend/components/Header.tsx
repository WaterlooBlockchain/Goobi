import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Header() {
  return (
    <div className="w-full text-white flex flex-row justify-evenly">
      <p>MR GOOSE</p>

      <p>EVENTS</p>

      <p>MERCH</p>


    </div>
  )
}
