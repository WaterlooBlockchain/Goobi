import Image from 'next/image';
import mrgoose from '../public/mr-goose.jpg';
import Link from 'next/link';
import Email from './Email';
import gr1 from '../public/gradient1.png';
import gr2 from '../public/gradient2.png';
import gr3 from '../public/gradient3.png';


export default function Hero() {
  function findPosition(obj: any) {
    var currenttop = 0;
    if (obj.offsetParent) {
      do {
        currenttop += obj.offsetTop;
      } while ((obj = obj.offsetParent));
      return currenttop;
    }
  }

  function scrollFunction() {
    window.scroll(0, findPosition(document.getElementById("claim"))! -48);
  }

  return (
    <div className="relative flex flex-row flex-wrap justify-center gap-16">
      {/* Black top part */}
      <div className="w-full relative bg-black text-white py-12 px-8 lg:px-64 flex flex-row justify-between flex-wrap">

        {/* Introducing $MRGOOSE text */}
          <div className="w-full">
            <div className="text-4xl lg:text-6xl font-bold mb-4 relative flex flex-col">
              <div className="bg-gradient-to-r from-yellow-200 to-yellow-500 text-transparent bg-clip-text">Introducing</div>
              <h1 className="text-6xl lg:text-8xl bg-gradient-to-r from-yellow-200 to-yellow-500 text-transparent bg-clip-text">$MRGOOSE</h1>
            </div>
          </div>
          {/* A token for Waterloo Blockchain text */}
          <p className="w-full text-2xl lg:text-4xl font-semibold mb-4 italic bg-gradient-to-r from-yellow-200 to-yellow-500 text-transparent bg-clip-text">Thank you Mr. Goose</p>
         {/* Buttons */}
         <div className="w-full flex flex-col justify-end items-end">
          <div className="mb-4">
              <button className="w-36 lg:w-64 h-12 bg-gradient-to-b from-yellow-200 to-yellow-500 hover:bg-yellow-500 text-black font-semibold text-sm lg:text-lg rounded-full transition duration-300 ease-in-out" onClick={() => {scrollFunction()}}>Claim $MRGOOSE</button>
          </div>
          <div>
            <Link href="/merch" passHref>
              <button className="w-36 lg:w-64 h-12 bg-transparent border border-white hover:bg-yellow-500 text-white font-semibold rounded-full text-sm lg:text-lg transition duration-300 ease-in-out">Get Merch</button>
            </Link>
          </div>
        </div>
        <Image src={gr3} width={300} height={300} alt='gradient1' className="absolute w-64 lg:w-[400px] right-0 bg-blend-overlay opacity-50 inset-0 order-last -z-2 " />

      </div>
        {/* Mr. Goose image */}
        <div className="w-full lg:w-1/2 flex flex-col items-center" id='claim' >
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