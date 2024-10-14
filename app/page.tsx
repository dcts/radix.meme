import Link from "next/link";
import Image from "next/image";
import { SparklesCore } from "@/components/ui/sparkles";

import nyanCat from "../public/nyan-cat.gif";
import heroRocketRacoon from "../public/hero-rocket-racoon.svg";
import bigCoin from "../public/big-filled-coin.svg";
import mediumCoin from "../public/medium-filled-coin.svg";
import smallCoin from "../public/small-filled-coin.svg";
import noRugPull from "../public/no-rug-pull.svg";
import noTeamAllocation from "../public/no-team-allocation.svg";
import noPreSale from "../public/no-pre-sale.svg";

import { HiMiniRocketLaunch } from "react-icons/hi2";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
  ModalFooter,
} from "@/components/ui/animated-modal";
import { AllCoinsGallery } from "@/components/AllCoinsGallery";
import RadixMemeButton from "@/components/RadixMemeButton";

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
      <main className="w-full">
        <Header />
        <div className="bg-dexter-grey-dark">
          <AllCoinsGallery />
        </div>

        <div className="grid max-sm:grid-cols-[3rem_1fr_3rem] max-md:grid-cols-[6rem_1fr_6rem] md:grid-cols-[8rem_1fr_8rem] w-full h-full">
          <div className="bg-dexter-grey-dark h-full"></div>
          <div className="flex flex-col items-center pt-8 pb-12 rounded-[20px] mb-5 border border-[#434343] ">
            <h3 className="max-sm:text-2xl sm:text-3xl font-title opacity-90 tracking-widest mb-4">
              What are you waiting for?
            </h3>
            <RadixMemeButton
              as={Link}
              href="/launch"
              text="Launch your token"
              icon={<HiMiniRocketLaunch />}
            />
          </div>
          <div className="bg-dexter-grey-dark h-full"></div>
        </div>
      </main>
    </div>
  );
}

const Header = () => {
  return (
    <div className="h-80">
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex flex-col lg:justify-center justify-start p-6 w-full">
          <h1 className="font-title text-4xl text-center max-w-[600px] m-auto sm:text-[50px] sm:leading-[50px] pb-8 text-almost-white lg:text-left lg:m-0">
            Instantly launch your meme coin with{" "}
            <span className="text-dexter-green">unlimited liquidity</span>
          </h1>
          <div className="font-body flex items-center flex-row m-auto lg:m-0">
            <ModalWrapper />
            <RadixMemeButton
              as={Link}
              href="/launch"
              text="Launch your token"
              icon={<HiMiniRocketLaunch />}
              className=""
              variant="cta"
            />
          </div>
        </div>
        <div className="hidden">
          <HeroImages />
        </div>
      </div>
    </div>
  );
};

const ModalWrapper = () => {
  return (
    <Modal>
      <ModalTrigger>
        <RadixMemeButton
          as="span"
          text="How does it work ?"
          variant="secondary"
          className="mr-4"
        />
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <div className="space-y-4 rounded-md text-center mx-auto sm:mx-0 bg-dexter-gray-c">
            <div className="font-title text-3xl font-bold pb-3">
              How does it work?
            </div>
            <div className="justify-center md:gap-1 lg:gap-2 sm:gap-2 gap-2 grid md:grid-cols-3">
              <div className="border rounded-md p-4 bg-radix-meme-grey-100">
                <div className="flex justify-center mx-auto pt-4">
                  <Image src={noRugPull} alt="no rug pull" width={50}></Image>
                </div>
                <p className="text-dexter-green font-bold text-md p-4">
                  No
                  <br />
                  rug pull
                </p>
              </div>
              <div className="border rounded-md p-4 bg-radix-meme-grey-100">
                <div className="flex justify-center mx-auto pt-4">
                  <Image src={noPreSale} alt="no pre-sale" width={50}></Image>
                </div>
                <p className="text-dexter-green font-bold text-md p-4">
                  No
                  <br />
                  pre-sale
                </p>
              </div>
              <div className="border rounded-md p-4 bg-radix-meme-grey-100">
                <div className="flex justify-center mx-auto pt-4">
                  <Image
                    src={noTeamAllocation}
                    alt="no team allocation"
                    width={50}
                  ></Image>
                </div>
                <p className="text-dexter-green font-bold text-md p-4">
                  No team allocation
                </p>
              </div>
            </div>
          </div>
          <div className="font-bold pl-6">
            <ol className="mx-auto list-decimal sm:text-lg mt-6">
              <li>Pick a coin that you like (or launch your own!)</li>
              <li>Buy the coin on the bonding curve</li>
              <li>Sell at any time to lock in your profits or losses</li>
            </ol>
          </div>
          <div className="mt-6 font-light">
            <p>
              When enough people buy on the bonding curve it reaches a market
              cap of $69k, $12k of liquidity is then deposited in ociswap to
              enable further trading.
            </p>
          </div>
        </ModalContent>
        <ModalFooter className="gap-4 flex justify-center bg-radix-meme-grey-200">
          <RadixMemeButton
            as={Link}
            href="/launch"
            text="I'm ready to pump!"
            icon={<HiMiniRocketLaunch />}
          />
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

// TODO: reposition with new layout
const HeroImages = () => {
  return (
    <div className="relative w-64 h-96 max-xl:hidden mr-32">
      <Image
        src={bigCoin}
        alt="bigCoin"
        width={60}
        className="absolute animate-float" //top-4 left-20
      />
      <Image
        src={mediumCoin}
        alt="mediumCoin"
        width={40}
        className="absolute animate-float" //bottom-4 -right-2
      />
      <Image
        src={smallCoin}
        alt="smallCoin"
        className="absolute animate-float" //bottom-24 -left-8 2xl:-left-12
      />
      <Image
        src={heroRocketRacoon}
        alt="rocket"
        height={475}
        className="absolute animate-floatRocket" //  top-10 left-6
      />
      <Image
        src={nyanCat}
        alt="rocket"
        height={1200}
        className="absolute animate-floatRocket w-96" //  top-10 left-6
      />
    </div>
  );
};
