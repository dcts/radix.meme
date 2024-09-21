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
    ],
  },
};

export default nextConfig;
