import Link from "next/link";
import Image from "next/image";
import { GalleryWithHover } from "@/components/ui/gallery-with-hover";
import { SparklesCore } from "@/components/ui/sparkles";
import heroRocket from "../public/hero-rocket.png";
import bigCoin from "../public/big-coin.png";
import mediumCoin from "../public/medium-coin.png";
import smallCoin from "../public/small-coin.png";
import { HiMiniRocketLaunch } from "react-icons/hi2";

export default function Home() {
  return (
    <div className="h-fit w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute -z-10 inset-0 min-h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <main>
        <div className="flex justify-between items-center mt-16 mb-24">
          <div className="flex flex-col gap-8 items-center sm:items-start">
            <div className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
              <h1 className="max-sm:text-2xl max-md:text-3xl md:text-4xl mb-10 font-black">
                <span>The first meme</span>
                <br></br>fair launch platform <br></br>on Radix
              </h1>
              <p className="mb-2">
                Launch you coin with infinite liquidity by using a bonding
                curve.
              </p>
              <p>Created by DeXter.</p>
            </div>

            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <Link
                href="/launch"
                className="flex items-center gap-4 bg-dexter-green-OG/90 hover:bg-dexter-gradient-green w-fit rounded-lg text-dexter-grey-light px-4 py-2 max-lg:self-center shadow-md shadow-dexter-green-OG transition duration-300"
              >
                <HiMiniRocketLaunch className="text-3xl" />
                <span className="font-bold text-xl">Launch your token</span>
              </Link>
            </div>
          </div>
          <div className="relative w-96 h-96 max-xl:hidden mr-32">
            <Image
              src={bigCoin}
              alt="bigCoin"
              className="absolute -bottom-8 -right-8"
            />
            <Image
              src={mediumCoin}
              alt="mediumCoin"
              className="absolute -top-2 -left-2"
            />
            <Image
              src={smallCoin}
              alt="smallCoin"
              className="absolute top-10 right-0"
            />
            <Image
              src={heroRocket}
              alt="rocket"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        <GalleryWithHover />
      </main>
    </div>
  );
}
