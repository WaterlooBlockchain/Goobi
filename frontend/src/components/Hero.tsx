import Image from 'next/image';
import mrgoose from '../../public/mr-goose.jpg';

export default function Hero() {
    return (
       

<div className="flex items-center justify-between p-8 text-white">
{/* Left section with Mr. Goose image */}
<div className="flex items-center">
  <div className="w-5/6 h-5/6">
    <Image src={mrgoose} alt="Mr. Goose" layout="responsive" />
  </div>
</div>

      {/* Right section with text */}
      <div className="w-full h-5/6 bg-gradient-to-r from-yellow-300 to-zinc-900">
<div className="text-4xl text-yellow-400 font-bold mb-4">Introducing $MRGOOSE</div>
        <div className="text-3xl font-semibold mb-4 text-yellow-700"> A token for <br /> Waterloo Blockchain</div>
      </div>
    </div>
    )
}