import Image from 'next/image';
import mrgoose from '../../public/mr-goose.jpg';
import Link from 'next/link';
import Email from './Email';

export default function Hero() {
  return (
    <div className="relative flex flex-row flex-wrap justify-center">
      {/* Black top part */}
      <div className="bg-black text-white py-12 px-8 flex flex-row justify-between flex-wrap">
        {/* Introducing $MRGOOSE text */}
          <div className="w-full">
            <div className="text-4xl lg:text-6xl font-bold mb-4 relative flex flex-col">
              <div className="bg-gradient-to-r from-yellow-200 to-yellow-500 text-transparent bg-clip-text">Introducing</div>
              <h1 className="text-6xl lg:text-8xl bg-gradient-to-r from-yellow-200 to-yellow-500 text-transparent bg-clip-text">$MRGOOSE</h1>
            </div>
          </div>

          {/* A token for Waterloo Blockchain text */}
          <p className="w-full text-2xl text-4xl font-semibold mb-4 italic bg-gradient-to-r from-yellow-200 to-yellow-500 text-transparent bg-clip-text">Thank you Mr. Goose</p>
         {/* Buttons */}
         <div className="w-full flex flex-col justify-end items-end">
          <div className="mb-4">
            <Link href="#email" passHref>
              <button className="w-36 lg:w-64 h-12 bg-gradient-to-b from-yellow-200 to-yellow-500 hover:bg-yellow-500 text-black font-semibold text-sm lg:text-lg rounded-full transition duration-300 ease-in-out">Claim $MRGOOSE</button>
            </Link>
          </div>
          <div>
            <Link href="/merch" passHref>
              <button className="w-36 lg:w-64 h-12 bg-transparent border border-white hover:bg-yellow-500 text-white font-semibold rounded-full text-sm lg:text-lg transition duration-300 ease-in-out">Get Merch</button>
            </Link>
          </div>
        </div>
      </div>
        {/* Mr. Goose image */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden relative">
            <Image src={mrgoose} alt="Mr. Goose" layout="fill" objectFit="cover" />
          </div>
          {/* Submitting email to claim */}
          <Email/>
        </div>
      {/* Yellow gradient bottom part */}
      <div className="w-full flex flex-col lg:flex-row gap-8 justify-evenly items-center bg-gradient-to-b from-yellow-200 to-yellow-500 text-black py-12 px-24">
        {/* Text groups */}
          {/* First text group */}
          <div>
            <h2 className="text-lg font-bold mb-2">Get $MRGOOSE at Events</h2>
              <ul className='list-item list-disc'>
                <li>Blockchain 101</li>
                <li>Hackathons</li>
                <li>Blockchain and Beer</li>
              </ul>
          </div>
          {/* Second text group */}
          <div>
            <h2 className="text-lg font-bold mb-2">Burn $MRGOOSE for merch</h2>
              <ul className='list-item list-disc'>
                <li>Swag</li>
                <li>Branded Gear</li>
                <li>Collectibles</li>
              </ul>
        </div>
      </div>
</div>
  );
}