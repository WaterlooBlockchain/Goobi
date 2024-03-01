import Image from 'next/image';
import mrgoose from '../../public/mr-goose.jpg';

export default function Hero() {
  return (
    <div className="flex items-stretch p-8 text-white"> {/* Change items-center to items-stretch */}
      {/* Left section with Mr. Goose image */}
      <div className="w-1/3 flex items-center justify-center"> {/* Adjust the width as needed */}
        <div className="w-full h-full">
          <Image src={mrgoose} alt="Mr. Goose" layout="responsive" width={200} height={200} /> {/* Adjust width and height as needed */}
        </div>
      </div>

      {/* Right section with text */}
      <div className="flex flex-col justify-center flex-1 px-8 py-4 bg-gradient-to-r from-yellow-300 via-yellow-600 to-zinc-900"> {/* Remove h-full class */}
        <div className="text-4xl text-black font-bold mb-8">Introducing $MRGOOSE</div>
        <div className="text-3xl animate-pulse font-semibold mb-4 text-yellow-700">A token for <br />Waterloo Blockchain</div>
      </div>
    </div>
  );
}
