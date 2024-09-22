import Image from "next/image";

//TODO: add social media links

const Footer = () => {
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

  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      {socials.map(({ id, url }, indx) => (
        <a href={url} key={indx} target="_blank" className="mr-2 mt-2">
          <Image src={`/socials/${id}.svg`} alt={id} width={32} height={32} />
        </a>
      ))}
    </footer>
  );
};

export default Footer;
