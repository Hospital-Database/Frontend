import createMiddleware from "next-intl/middleware";
import { defaultLocale } from "./next.locales";

export default createMiddleware({
	locales: ["en", "ar"],
	defaultLocale: defaultLocale.code,
	localePrefix: "as-needed",
});

export const config = {
	// Skip all paths that should not be internationalized
	matcher: ["/((?!api|_next|.*\\..*).*)"],
};
