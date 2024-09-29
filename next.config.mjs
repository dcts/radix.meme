/** @type {import('next').NextConfig} */
const nextConfig = {
  // React strict mode causes the dApp to render twice.
  // For some reason this does not play well with dApp toolkit.
  // https://discord.com/channels/417762285172555786/1181329944811413555/1181336985609175080
  reactStrictMode: false,

  headers: () => [
    {
      source: '/',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],

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
