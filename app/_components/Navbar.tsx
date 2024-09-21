const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between h-16">
      <div className="flex justify-center items-center relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="racoon head"
          src="/racoon-head.png"
          width={50}
          height={50}
          className="hover:animate-spin transition duration-1000"
        />
        <h1 className="ml-3 text-lg text-white font-bold font-[family-name:var(--font-geist-mono)]">
          radix.meme
        </h1>
        <BetaLabel />
      </div>
      <radix-connect-button></radix-connect-button>
    </div>
  );
};

const BetaLabel = () => {
  return (
    <div className="bg-[#E00202] text-xs font-bold px-2 py-1 rounded-md absolute rotate-[15deg] right-[-37px] top-[-5px] hover:scale-[1.2] transition-transform duration-300 select-none">
      BETA
    </div>
  );
};
export default Navbar;
