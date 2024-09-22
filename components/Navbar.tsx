import Image from "next/image";
import Link from "next/link";
import logo from "../public/racoon-head.png";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between h-16">
      <Link href="/" className="flex justify-center items-center relative">
        <Image
          alt="racoon head"
          src={logo}
          width={50}
          height={50}
          className="hover:animate-spin transition duration-1000"
        />
        <h1 className="ml-3 text-lg text-white font-bold font-[family-name:var(--font-geist-mono)]">
          radix.meme
        </h1>
        <BetaLabel />
      </Link>
      <radix-connect-button></radix-connect-button>
    </div>
  );
};

const BetaLabel = () => {
  return (
    <div className="bg-dexter-red text-xs font-bold px-2 py-1 rounded-md absolute rotate-[15deg] right-[-37px] top-[-5px] hover:scale-[1.2] transition-transform duration-300 select-none">
      BETA
    </div>
  );
};
export default Navbar;
