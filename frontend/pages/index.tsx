import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="w-full h-screen bg-black">
      <Header />
      <div>

      </div>
    </main>
  )
}
