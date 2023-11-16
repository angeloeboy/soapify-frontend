import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req) {
	// const auth_link = "https://iamangelo.tech/api" + "/auth";

	//get auth link from env variable
	const link = process.env.NEXT_PUBLIC_API_LINK ? process.env.NEXT_PUBLIC_API_LINK : "https://iamangelo.tech/api";

	// const auth_link = `http://localhost` + "/auth";
	const auth_link = `${link}/auth`;
	const token = req.cookies.get("token");
	const secretKey = process.env.JWT_SECRET_KEY;
	let permissions = [];

	if (req.nextUrl.pathname.startsWith("/api/") || req.nextUrl.pathname.includes("/_next/")) {
		return NextResponse.next();
	}

	try {
		// if (token) {
		// 	try {
		// 		const decoded = jwt.decode(token.value, secretKey);
		// 		permissions = decoded.permissions || [];
		// 	} catch (verifyError) {
		// 		console.error("JWT verification error:", verifyError);
		// 		const url = req.nextUrl.clone();
		// 		url.pathname = "/login";
		// 		return NextResponse.redirect(url);
		// 	}
		// }

		// // If accessing dashboard without a token, redirect to home
		// if (req.nextUrl.pathname.startsWith("/dashboard") && !token) {
		// 	const url = req.nextUrl.clone();
		// 	url.pathname = "/";
		// 	return NextResponse.redirect(url);
		// }

		// // If accessing root or login with a token, verify and redirect to dashboard if valid
		// if ((req.nextUrl.pathname === "/" || req.nextUrl.pathname.startsWith("/login")) && token) {
		// 	const response = await fetch(auth_link + "/verify-token", {
		// 		headers: {
		// 			Cookie: `token=${token.value}`,
		// 		},
		// 	});

		// 	if (response.ok) {
		// 		const url = req.nextUrl.clone();
		// 		url.pathname = "/dashboard";
		// 		return NextResponse.redirect(url);
		// 	}
		// }

		// // For dashboard route, if token is not valid, redirect to login
		// if (req.nextUrl.pathname.startsWith("/dashboard")) {
		// 	const response = await fetch(auth_link + "/verify-token", {
		// 		headers: {
		// 			Cookie: `token=${token.value}`,
		// 		},
		// 	});

		// 	let data = await response.json();
		// 	if (data.user.role_id !== 1) {
		// 		const url = req.nextUrl.clone();
		// 		url.pathname = "/user";
		// 		return NextResponse.redirect(url);
		// 	}

		// 	const url = req.nextUrl.clone();
		// 	url.pathname = "/";

		// 	return response.ok ? NextResponse.next() : NextResponse.redirect(url);
		// }

		// const next_response = NextResponse.next();
		// next_response.cookies.set("permissions", JSON.stringify(permissions), {
		// 	httpOnly: false,
		// 	path: "/",
		// });

		// return next_response;

		if (token) {
			try {
				const decoded = jwt.decode(token.value, secretKey);
				permissions = decoded.permissions || [];
			} catch (verifyError) {
				console.error("JWT verification error:", verifyError);
				const url = req.nextUrl.clone();
				url.pathname = "/login";
				return NextResponse.redirect(url);
			}
		}

		// If accessing dashboard without a token, redirect to home
		if (req.nextUrl.pathname.startsWith("/dashboard") && !token) {
			const url = req.nextUrl.clone();
			url.pathname = "/";
			return NextResponse.redirect(url);
		}

		// If accessing root or login with a token, verify and redirect to dashboard if valid
		if ((req.nextUrl.pathname === "/" || req.nextUrl.pathname.startsWith("/login")) && token) {
			const response = await fetch(auth_link + "/verify-token", {
				headers: {
					Cookie: `token=${token.value}`,
				},
			});

			if (response.ok) {
				const url = req.nextUrl.clone();
				url.pathname = "/dashboard";

				// Set cookies before redirecting
				const next_response = NextResponse.redirect(url);
				next_response.cookies.set("permissions", JSON.stringify(permissions), {
					httpOnly: false,
					path: "/",
				});
				return next_response;
			}
		}

		// For dashboard route, if token is not valid, redirect to login
		if (req.nextUrl.pathname.startsWith("/dashboard")) {
			const response = await fetch(auth_link + "/verify-token", {
				headers: {
					Cookie: `token=${token.value}`,
				},
			});

			let data = await response.json();
			console.log(data);

			if (data.user.role_id !== 1) {
				const url = req.nextUrl.clone();
				url.pathname = "/user";
				return NextResponse.redirect(url);
			}

			const url = req.nextUrl.clone();
			url.pathname = "/";
			// Set cookies here as well
			const next_response = response.ok ? NextResponse.next() : NextResponse.redirect(url);
			next_response.cookies.set("permissions", JSON.stringify(permissions), {
				httpOnly: false,
				path: "/",
			});

			return next_response;
		}

		// Set cookies for all other routes
		const next_response = NextResponse.next();
		next_response.cookies.set("permissions", JSON.stringify(permissions), {
			httpOnly: false,
			path: "/",
		});

		return next_response;
	} catch (error) {
		console.error("Error in middleware:", error);
		const url = req.nextUrl.clone();
		url.pathname = "/";
		return NextResponse.redirect(url);
	}
}
