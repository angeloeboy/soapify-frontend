/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://iamangelo.tech/api/:path*",
			},
		];
	},
};

module.exports = nextConfig;
