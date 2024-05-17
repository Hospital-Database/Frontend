import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { accessTokenCookie } from "./lib/cookies.server";
import { defaultLocale } from "./next.locales";
import { Routes, checkRouteType } from "./routes/routes";

const intlMiddleware = createMiddleware({
	locales: ["en", "ar"],
	defaultLocale: defaultLocale.code,
	localePrefix: "as-needed",
});

export default function middleware(req: NextRequest) {
	const accessToken = accessTokenCookie.get();
	const pathname = req.nextUrl.pathname;

	if (
		!accessToken &&
		!checkRouteType(pathname, "auth") &&
		!Routes.home.doesMatch(pathname)
	) {
		if (Routes.home.doesMatch(pathname)) {
			return NextResponse.redirect(new URL(Routes.login(), req.url));
		}
	}

	if (accessToken && Routes.home.doesMatch(pathname)) {
		return NextResponse.redirect(new URL(Routes.dashboard(), req.url));
	}

	return intlMiddleware(req);
}

export const config = {
	// Skip all paths that should not be internationalized
	matcher: ["/((?!api|_next|.*\\..*).*)"],
};
