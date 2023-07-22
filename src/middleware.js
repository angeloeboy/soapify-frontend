import { NextResponse } from "next/server";

export async function middleware(req) {
	if (req.nextUrl.pathname.startsWith("/dashboard")) {
		const auth_link = "https://iamangelo.tech/api" + "/auth";

		const token = req.cookies.get("token");
		console.log(token);

		if (!token) {
			const url = req.nextUrl.clone();
			url.pathname = "/login";
			return NextResponse.rewrite(url);
		}

		const response = await fetch(auth_link + "/verify-token", {
			headers: {
				Cookie: `token=${token.value}`,
			},
		});

		return response.ok ? NextResponse.next() : NextResponse.redirect("/login");
	}

	// return NextResponse.next();
}
