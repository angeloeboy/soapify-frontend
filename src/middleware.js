import { NextResponse } from "next/server";

export async function middleware(req) {
	const auth_link = "https://iamangelo.tech/api" + "/auth";
	const token = req.cookies.get("token");

	// If accessing dashboard without a token, redirect to home
	if (req.nextUrl.pathname.startsWith("/dashboard") && !token) {
		const url = req.nextUrl.clone();
		url.pathname = "/";
		return NextResponse.rewrite(url);
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
			return NextResponse.rewrite(url);
		}
	}

	// For dashboard route, if token is not valid, redirect to login
	if (req.nextUrl.pathname.startsWith("/dashboard")) {
		const response = await fetch(auth_link + "/verify-token", {
			headers: {
				Cookie: `token=${token.value}`,
			},
		});

		const url = req.nextUrl.clone();
		url.pathname = "/login";
		return response.ok ? NextResponse.next() : NextResponse.rewrite(url);
	}

	return NextResponse.next();
}
