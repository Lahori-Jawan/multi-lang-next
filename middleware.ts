import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE } from "@constants/misc";
import { getToken } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";

const PUBLIC_FILE = /\.(.*)$/;
const publicRoutes = ["login", "register", "google-signin"];

export async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname;
	const skip = skipRoutes(req);

	if (skip) return;

	const token = await getToken({
		req,
		// secret: process.env.NEXTAUTH_SECRET,
		raw: true,
	});

	let url: string | NextURL | URL;
	if (!token) {
		let locale;
		if (req.nextUrl.pathname.includes("google-signin")) return;
		if (req.nextUrl.locale === "default") {
			locale = req.cookies.get("NEXT_LOCALE") || DEFAULT_LOCALE;
			url = new URL(`${locale}/login`, req.url);
			return NextResponse.redirect(url);
		}
	}

	const response = prefixAndRedirect(req);

	return response;
}

function skipRoutes(req: NextRequest) {
	if (
		req.nextUrl.pathname.startsWith("/_next") ||
		req.nextUrl.pathname.includes("/api/") ||
		PUBLIC_FILE.test(req.nextUrl.pathname)
	) {
		return true;
	}
}

function prefixAndRedirect(req: NextRequest) {
	if (req.nextUrl.locale === "default") {
		const locale = req.cookies.get("NEXT_LOCALE") || DEFAULT_LOCALE;

		return NextResponse.redirect(
			new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
		);
	}
}
