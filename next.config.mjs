/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "em-content.zobj.net",
        port: "",
        pathname: "/**/**",
      },
      {
        protocol: "https",
        hostname: "fuchsia-dramatic-heron-401.mypinata.cloud",
        port: "",
        pathname: "/**/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sunpump.meme",
        port: "",
        pathname: "/public/logo/**",
      },
      {
        protocol: "https",
        hostname: "www.radix.meme",
        port: "",
        pathname: "/**/**",
      },
    ],
  },
};


export default nextConfig;
