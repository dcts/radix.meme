const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || "";
const X_URL = process.env.NEXT_PUBLIC_X_URL || "";
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL || "";

const Footer = () => {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Telegram
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href={X_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
    </footer>
  );
};

export default Footer;
