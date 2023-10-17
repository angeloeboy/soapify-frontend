/** @type {import('next').NextConfig} */
const link = process.env.NEXT_PUBLIC_API_LINK;

const nextConfig = {
	output: "standalone",
	async rewrites() {
		// return [
		//   {
		//     source: "/api/:path*",
		//     destination: "https://iamangelo.tech/api/:path*",
		//   },
		// ];
		return [
			{
				source: "/api/:path*",
				destination: `${link}/:path*`,
			},
		];
	},
};

module.exports = nextConfig;
