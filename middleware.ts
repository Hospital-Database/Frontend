import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { accessTokenCookie } from "./lib/cookies.server";
import { defaultLocale } from "./next.locales";
import { Routes, isAuthPath } from "./routes/routes";

const intlMiddleware = createMiddleware({
	locales: ["en", "ar"],
	defaultLocale: defaultLocale.code,
	localePrefix: "as-needed",
});

export default function middleware(req: NextRequest) {
	const accessToken = accessTokenCookie.get();
	const pathname = req.nextUrl.pathname;

	if (!accessToken && !isAuthPath(pathname)) {
		if (Routes.home.doesMatch(pathname)) {
			return NextResponse.redirect(new URL("/login", req.url));
		}
	}

	if (Routes.home.doesMatch(pathname)) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	return intlMiddleware(req);
}

export const config = {
	// Skip all paths that should not be internationalized
	matcher: ["/((?!api|_next|.*\\..*).*)"],
};
