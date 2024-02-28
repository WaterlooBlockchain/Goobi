import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="w-full h-screen bg-white">
    <Header />
    <div className="container mx-auto">
    {/* Section 1: Introduction of the token */}
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-4">Introducing $MRGOOSE</h2>
      <div className="text-sm mb-4"> A token for <br /> Waterloo Blockchain</div>
      {/* Add your token introduction content here */}
    </section>

    {/* Section 2: Submitting email to claim */}
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-4">Submit Email to Claim</h2>
      <div className="flex">
      <input
      type="email"
      placeholder="Enter your @uwaterloo.ca email"
      pattern=".+@uwaterloo\.ca"
      className="rounded-l-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 flex-1"
      required // Ensure that the field is not empty
    />
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md">
      Submit
    </button>
      </div>
    </section>

    {/* Section 3: Preview of merchandises */}
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-4">Merchandise Preview</h2>
      {/* Add preview of merchandises here */}
      <Link href="/burn" passHref={true} legacyBehavior={true}>
        <div className="text-blue-500 hover:underline">View More Merchandises &#8594;</div>
      </Link>
    </section>

    {/* Section 4: Preview of events */}
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-4">Events Preview</h2>
      {/* Add preview of events here */}
      <Link href="/events" passHref={true} legacyBehavior={true}>
        <div className="text-blue-500 hover:underline">View More Events &#8594;</div>
      </Link>
    </section>
  </div>
  </main>
    )
}
