const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between h-16">
      <div className="flex justify-center items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="racoon head" src="/racoon-head.png" width={50} height={50} />
        <h1 className="ml-3 text-lg text-white font-bold font-[family-name:var(--font-geist-mono)]">radix.meme</h1>
      </div>
      <radix-connect-button></radix-connect-button>
    </div>
  );
};

export default Navbar;
