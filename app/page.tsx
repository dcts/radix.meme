import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <h1 className="text-4xl mb-10 font-black">
          The first meme <br></br>fair launch platform <br></br>on Radix
        </h1>
        <p className="mb-2">
          Launch you coin instantly with infinite liquidity
        </p>
        <p className="mb-2">By using a bonding curve.</p>
        <p>Created by DeXter.</p>
      </div>

      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <Link
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          href="/launch"
        >
          <Image
            className="dark:invert"
            src="https://em-content.zobj.net/source/apple/114/fire_1f525.png"
            alt="Fire emoji"
            width={20}
            height={20}
          />
          Launch now
        </Link>
        <a
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Browse coins
        </a>
      </div>
    </main>
  );
}
