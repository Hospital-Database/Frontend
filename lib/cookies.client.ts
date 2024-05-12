import "client-only";

import Cookies from "js-cookie";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const accessTokenCookie = createCookieStorage(ACCESS_TOKEN_KEY);
export const refreshTokenCookie = createCookieStorage(REFRESH_TOKEN_KEY);
export const TEN_DAYS_ms = 1000 * 60 * 60 * 24 * 10;

function createCookieStorage(COOKIE_KEY: string) {
	return {
		set: (data: string, rootPath = "/") => {
			Cookies.set(COOKIE_KEY, data, {
				expires: new Date(Date.now() + TEN_DAYS_ms),
				path: rootPath,
			});
		},
		get: () => {
			const data = Cookies.get(COOKIE_KEY);
			if (data) return data;
		},
		delete: () => {
			Cookies.remove(COOKIE_KEY);
		},
	};
}
