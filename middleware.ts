import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE } from "@constants/misc";
import { getToken } from "next-auth/jwt";

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

	if (!token) return redirectToLogin(req);

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

function redirectToLogin(req: NextRequest) {
	const IS_PUBLIC_PATH = publicRoutes.some((path) =>
		req.nextUrl.pathname.includes(path)
	);

	if (IS_PUBLIC_PATH) return;

	const IS_UNKNOWN_LOCALE = req.nextUrl.locale === "default";
	const locale = IS_UNKNOWN_LOCALE
		? req.cookies.get("NEXT_LOCALE") || DEFAULT_LOCALE
		: req.nextUrl.locale;

	return NextResponse.redirect(new URL(`${locale}/auth/login`, req.url));
}

function prefixAndRedirect(req: NextRequest) {
	if (req.nextUrl.locale === "default") {
		const locale = req.cookies.get("NEXT_LOCALE") || DEFAULT_LOCALE;

		return NextResponse.redirect(
			new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
		);
	}
}
