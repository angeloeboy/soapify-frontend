/** @type {import('next').NextConfig} */

const link = process.env.NEXT_PUBLIC_API_LINK ? process.env.NEXT_PUBLIC_API_LINK : "https://smsabon.com/api";

const nextConfig = {
	output: "standalone",
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `${link}/:path*`,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/dcomgxgfe/**",
			},
		],
	},
};

module.exports = nextConfig;
