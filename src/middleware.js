import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req) {
	// const auth_link = "https://iamangelo.tech/api" + "/auth";

	//get auth link from env variable
	const link = process.env.NEXT_PUBLIC_API_LINK ? process.env.NEXT_PUBLIC_API_LINK : "https://smsabon.com/api";

	// const auth_link = `http://localhost` + "/auth";
	const auth_link = `${link}/auth`;
	const token = req.cookies.get("token");
	const secretKey = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : "secret";
	let permissions = [];

	if (req.nextUrl.pathname.startsWith("/api/") || req.nextUrl.pathname.includes("/_next/")) {
		return NextResponse.next();
	}

	try {
		if (token) {
			try {
				const decoded = jwt.decode(token.value, secretKey);
				permissions = decoded.permissions || [];
			} catch (verifyError) {
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

			let data = await response.json();

			if (response.ok) {
				const url = req.nextUrl.clone();
				url.pathname = "/dashboard";

				// Set cookies before redirecting
				const next_response = NextResponse.redirect(url);

				permissions = data.permissions;

				// next_response.cookies.set("permissions", JSON.stringify(data.permissions), {
				// 	httpOnly: false,
				// 	path: "/",
				// });

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

			if (data?.user?.role_id == 2) {
				const url = req.nextUrl.clone();
				url.pathname = "/user";
				return NextResponse.redirect(url);
			}

			const url = req.nextUrl.clone();
			url.pathname = "/";
			permissions = data.permissions;
			const next_response = response.ok ? NextResponse.next() : NextResponse.redirect(url);

			next_response.cookies.set("permissions", JSON.stringify(data.permissions), {
				httpOnly: false,
				path: "/",
			});

			next_response.cookies.set("role", JSON.stringify(data?.user?.role_id), {
				httpOnly: false,
				path: "/",
			});

			return next_response;
		}

		const next_response = NextResponse.next();

		return next_response;
	} catch (error) {
		console.error("Error in middleware:", error);
		const url = req.nextUrl.clone();
		url.pathname = "/";
		return NextResponse.redirect(url);
	}
}
