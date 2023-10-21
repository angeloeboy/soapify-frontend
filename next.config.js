/** @type {import('next').NextConfig} */
// const link = process.env.NEXT_PUBLIC_API_LINK || "https://iamangelo.tech/api";
const link = process.env.NEXT_PUBLIC_API_LINK ? process.env.NEXT_PUBLIC_API_LINK : "https://iamangelo.tech/api";

const nextConfig = {
	output: "standalone",
	async rewrites() {
		// return [
		// 	{
		// 		source: "/api/:path*",
		// 		destination: "https://iamangelo.tech/api/:path*",
		// 	},
		// ];
		return [
			{
				source: "/api/:path*",
				destination: "http://localhost:3001/:path*",
			},
		];
	},
};

module.exports = nextConfig;
