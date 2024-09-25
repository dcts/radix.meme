import Image from "next/image";

const socials = [
  {
    id: "telegram",
    url: process.env.NEXT_PUBLIC_TELEGRAM_URL || "",
  },
  {
    id: "github",
    url: process.env.NEXT_PUBLIC_GITHUB_URL || "",
  },
  {
    id: "x",
    url: process.env.NEXT_PUBLIC_X_URL || "",
  },
];

const Footer = () => {
  return (
    <footer className="flex flex-wrap items-center justify-center bg-dexter-grey-dark w-full py-8">
      {socials.map(({ id, url }, indx) => (
        <a href={url} key={indx} target="_blank" className="mr-2">
          <Image src={`/socials/${id}.svg`} alt={id} width={32} height={32} />
        </a>
      ))}
    </footer>
  );
};

export default Footer;
