import { NextResponse } from "next/server";

export async function middleware(req) {
	// const auth_link = "https://iamangelo.tech/api" + "/auth";

	//get auth link from env variable
	const link = process.env.NEXT_PUBLIC_API_LINK ? process.env.NEXT_PUBLIC_API_LINK : "https://iamangelo.tech/api";

	// const auth_link = `http://localhost` + "/auth";
	const auth_link = `${link}/auth`;

	const token = req.cookies.get("token");

	try {
		// If accessing dashboard without a token, redirect to home
		if (req.nextUrl.pathname.startsWith("/dashboard") && !token) {
			const url = req.nextUrl.clone();
			url.pathname = "/";
			// return NextResponse.rewrite(url);
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
				// return NextResponse.rewrite(url);
				return NextResponse.redirect(url);
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
			if (data.user.role_id !== 1) {
				const url = req.nextUrl.clone();
				url.pathname = "/user";
				// return NextResponse.rewrite(url);
				return NextResponse.redirect(url);
			}

			const url = req.nextUrl.clone();
			url.pathname = "/";
			// console.log("test");
			// return response.ok ? NextResponse.next() : NextResponse.rewrite(url);
			return response.ok ? NextResponse.next() : NextResponse.redirect(url);
		}

		return NextResponse.next();
	} catch (error) {
		const url = req.nextUrl.clone();
		url.pathname = "/";
		return NextResponse.redirect(url);
	}
}
