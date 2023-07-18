import { NextResponse } from "next/server";

export async function middleware(req) {
	if (req.nextUrl.pathname.startsWith("/dashboard")) {
		const token = req.cookies.get("token");

		// Check for token
		if (!token) {
			const url = req.nextUrl.clone();
			url.pathname = "/login";
			return NextResponse.rewrite(url);
		}

		const response = await fetch("http://localhost:3001/auth/verify-token", {
			headers: {
				Cookie: `token=${token.value}`,
			},
		});

		return response.ok ? NextResponse.next() : NextResponse.redirect("/login");
	}

	return NextResponse.next();
}
