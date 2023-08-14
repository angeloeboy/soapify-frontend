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
		// return [
		// 	{
		// 		//source: "/api/:path*",
		// 		//destination: "http://localhost:3001/:path*",
		// 	},
		// ];
	},
};

module.exports = nextConfig;
