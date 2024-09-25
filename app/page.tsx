import Link from "next/link";
import Image from "next/image";
import { GalleryWithHover } from "@/components/ui/gallery-with-hover";
import { SparklesCore } from "@/components/ui/sparkles";
import heroRocket from "../public/hero-rocket.svg";
import bigCoin from "../public/big-filled-coin.png";
import mediumCoin from "../public/medium-filled-coin.png";
import smallCoin from "../public/small-filled-coin.png";
import { HiMiniRocketLaunch } from "react-icons/hi2";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
  ModalFooter,
} from "@/components/ui/animated-modal";
import { BetaLabel } from "@/components/Navbar";

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
        <div className="h-[calc(100lvh-20rem)] pt-16 flex justify-around items-center mx-16 xl:mx-[4.5rem] 2xl:mx-20 px-8 2xl:px-20 gap-x-32">
          <div className="flex flex-col gap-8 items-center sm:items-start">
            <div className="list-inside list-decimal text-sm text-center sm:text-left ">
              <h1 className="relative font-[family-name:var(--font-londrina-solid)] text-8xl max-sm:text-6xl max-md:text-8xl md:text-8xl mb-4 font-black tracking-wider">
                RADIX.MEME
                <span className="absolute -top-6 right-0 text-base flex gap-x-2">
                  <span className="text-[20px] tracking-[2px] text-dexter-green-OG/80">
                    By DeXter
                  </span>{" "}
                  <BetaLabel additionalClasses="!text-[20px]" />
                </span>
              </h1>
              <p className="font-[family-name:var(--font-josefin-sans)] text-2xl max-sm:text-l max-md:text-2xl md:text-2xl mb-6 max-w-lg sm:max-w-sm md:max-w-md font-normal !leading-8">
                Instantly launch your coin with unlimited liquidity using a
                dynamic bonding curve.
              </p>
            </div>

            <div className="flex gap-8 items-center flex-col sm:flex-row font-[family-name:var(--font-josefin-sans)]">
              <Link
                href="/launch"
                className="flex items-center gap-2 bg-dexter-green-OG/90 hover:bg-dexter-gradient-green w-fit rounded-lg text-dexter-grey-light px-4 py-2 max-lg:self-center shadow-md shadow-dexter-green-OG transition duration-300"
              >
                <HiMiniRocketLaunch className="text-3xl" />
                <span className="font-bold text-lg">Launch your token</span>
              </Link>
              <ModalWrapper />
            </div>
          </div>
          <HeroImages />
        </div>
        <div className="bg-dexter-grey-dark">
          <GalleryWithHover />
        </div>

        <div className="w-full flex flex-col items-center justify-center mt-16 mb-8 gap-y-6">
          <h3 className="text-3xl font-[family-name:var(--font-londrina-solid)] opacity-90 tracking-widest">
            What are you waiting for?
          </h3>
          <Link
            href="/launch"
            className="flex items-center gap-2 bg-dexter-green-OG/90 hover:bg-dexter-gradient-green w-fit rounded-lg text-dexter-grey-light px-4 py-2 max-lg:self-center shadow-blur-dexter-green-OG hover:shadow-blur-dexter-gradient-green transition duration-300"
          >
            <HiMiniRocketLaunch className="text-3xl opacity-80" />
            <span className="font-bold text-lg !font-[family-name:var(--font-josefin-sans)] tracking-wider opacity-80">
              Launch your token
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}

const ModalWrapper = () => {
  return (
    <Modal>
      <ModalTrigger className="flex items-center border-b-[3px] border-b-white bg-dexter-grey-dark w-fit rounded-lg text-white px-4 py-3 max-lg:self-center shadow-md hover:shadow-lg ring-1 ring-white shadow-white hover:shadow-white transition duration-100 active:translate-y-1">
        <span className="font-bold text-lg ">How does it work ?</span>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <div className="space-y-4 rounded-md text-center py-4 pb-8 sm:text-lg -mx-4">
            <p>
              <span className="text-dexter-green-OG">RADIX.MEME </span>
              prevents rugs by making sure that all created tokens are safe.{" "}
            </p>
            <p>
              Each coin on{" "}
              <span className="text-dexter-green-OG">RADIX.MEME </span>
              is a fair-launch with no presale and no team allocation.
            </p>
          </div>
          <ul className="text-justify flex flex-col gap-y-4 items-start justify-start max-w-sm mx-auto list-disc sm:text-lg">
            <li>pick a coin that you like (or launch your own!)</li>
            <li>buy the coin on the bonding curve</li>
            <li>sell at any time to lock in your profits or losses</li>
            <li>
              when enough people buy on the bonding curve it reaches a market
              cap of $69k
            </li>
            <li>
              $12k of liquidity is then deposited in ociswap to enable further
              trading.
            </li>
          </ul>
        </ModalContent>
        <ModalFooter className="gap-4 flex justify-center">
          <Link
            href="/launch"
            className="flex items-center gap-2 bg-dexter-green-OG/90 hover:bg-dexter-gradient-green w-fit rounded-lg text-dexter-grey-light px-4 py-2 max-lg:self-center shadow-md shadow-dexter-green-OG transition duration-300"
          >
            <HiMiniRocketLaunch className="text-3xl" />
            <span className="font-bold text-l">I&apos;m ready to pump!</span>
          </Link>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

const HeroImages = () => {
  return (
    <div className="relative w-96 h-96 max-xl:hidden mr-32">
      <Image
        src={bigCoin}
        alt="bigCoin"
        width={105}
        className="absolute top-4 left-20 animate-float"
      />
      <Image
        src={mediumCoin}
        alt="mediumCoin"
        width={75}
        className="absolute bottom-4 -right-2  animate-float"
      />
      <Image
        src={smallCoin}
        alt="smallCoin"
        className="absolute bottom-24 -left-8 2xl:-left-12 animate-float"
      />
      <Image
        src={heroRocket}
        alt="rocket"
        height={475}
        className="absolute animate-floatRocket top-10 left-6  "
      />
    </div>
  );
};
