import { availableLocaleCodes } from "@/next.locales";

export const LOGIN_REDIRECT = "/login";

export const AFTER_LOGIN_REDIRECT = "/";

const authRoutesRegex = routesToRegex([
	"/login",
	"/signup",
	"/forget-password",
	"/reset-password",
	"/auth-error",
]);

export function isAuthPath(str: string) {
	return authRoutesRegex.test(str);
}

export function isEditInLocalStoragePath(str: string) {
	return /templates\/edit\/template-(1|2|3)/.test(str);
}

export function routesToRegex(routes: string[]) {
	return RegExp(
		`^(/(${availableLocaleCodes.join("|")}))?(${routes
			.flatMap((p) => (p === "/" ? ["", "/"] : p))
			.join("|")})/?(\\?.*)?$`,
		"i",
	);
}
