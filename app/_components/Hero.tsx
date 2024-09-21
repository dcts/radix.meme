import Image from "next/image";
import heroImg from "../../public/hero.png";
import Link from "next/link";
import { HiMiniRocketLaunch } from "react-icons/hi2";

const Hero = () => {
  return (
    <div className="flex w-full justify-between items-center gap-24 max-md:h-[80dvh] h-[70dvh]">
      <div className="max-lg:flex max-lg:flex-col max-lg:items-center">
        <h1 className="max-sm:text-5xl max-md:text-6xl max-lg:text-7xl lg:text-8xl text-dexter-green">
          RADIX.MEME
        </h1>
        <h2 className="max-lg:text-center max-sm:text-lg max-md:text-xl max-lg:text-2xl lg:text-3xl opacity-90 max-w-xl mt-8 mb-12">
          Instantly launch your coin with unlimited liquidity using a dynamic
          bonding curve.
        </h2>

        <Link
          href="/launch"
          className="flex items-center gap-4 bg-dexter-green w-fit rounded-lg text-dexter-grey-light px-4 py-2 max-lg:self-center"
        >
          <HiMiniRocketLaunch className="text-3xl" />
          <span className="font-bold text-xl">Launch your token</span>
        </Link>
      </div>

      <Image src={heroImg} alt="" className="max-lg:hidden" />
    </div>
  );
};

export default Hero;
