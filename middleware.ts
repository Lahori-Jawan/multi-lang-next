import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE } from "@constants/misc";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
	const skip = skipRoutes(req);

	if (skip) return;

	const response = prefixRoute(req);

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

function prefixRoute(req: NextRequest) {
	if (req.nextUrl.locale === "default") {
		const locale = req.cookies.get("NEXT_LOCALE") || DEFAULT_LOCALE;

		return NextResponse.redirect(
			new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
		);
	}
}
