import Image from 'next/image';
import mrgoose from '../../public/mr-goose.jpg';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative">
      {/* Black top part */}
      <div className="bg-black text-white py-12 px-8 flex items-center justify-between">
        {/* Introducing $MRGOOSE text */}
          <div className="w-1/2">
  <div className="text-4xl font-bold mb-4 relative flex flex-col">
    <div className="bg-gradient-to-r from-yellow-200 to-yellow-500 text-transparent bg-clip-text">Introducing</div>
    <h1 className="text-6xl bg-gradient-to-r from-yellow-200 to-yellow-500 text-transparent bg-clip-text">$MRGOOSE</h1>
  </div>
</div>

          {/* A token for Waterloo Blockchain text */}
        <div className="mb-8">
          <p className="text-2xl font-semibold mb-4">A token for <br />Waterloo Blockchain</p>
        </div>
         {/* Buttons */}
         <div className="flex flex-col justify-center">
          <div className="mb-4">
            <Link href="#email" passHref>
              <button className="bg-gradient-to-b from-yellow-200 to-yellow-500 hover:bg-yellow-500 text-black font-semibold text-sm py-2 px-6 rounded-full transition duration-300 ease-in-out">Claim $MRGOOSE</button>
            </Link>
          </div>
          <div>
            <Link href="/merch" passHref>
              <button className="bg-transparent border border-white hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out">Claim Merch</button>
            </Link>
          </div>
        </div>
        </div>
        {/* Mr. Goose image */}
        <div className="w-1/2 flex justify-end">
          <div className="w-32 h-32 rounded-full overflow-hidden relative">
            <Image src={mrgoose} alt="Mr. Goose" layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>
      {/* Yellow gradient bottom part */}
      <div className="bg-gradient-to-b from-yellow-200 to-yellow-500 text-black py-12 px-8">

        {/* Text groups */}
        <div className="grid grid-cols-2 gap-4">
          {/* First text group */}
          <div>
            <h2 className="text-lg font-bold mb-2">Group 1 Heading</h2>
            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus ipsum nec enim fringilla, et tincidunt sapien consequat.</p>
          </div>
          {/* Second text group */}
          <div>
            <h2 className="text-lg font-bold mb-2">Group 2 Heading</h2>
            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus ipsum nec enim fringilla, et tincidunt sapien consequat.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
