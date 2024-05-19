import type { UserType } from "@/hooks/use-permissions";
import Cookies from "js-cookie";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const USER_TYPE_TOKEN_KEY = "user_type";
export const accessTokenCookie = createCookieStorage(ACCESS_TOKEN_KEY);
export const refreshTokenCookie = createCookieStorage(REFRESH_TOKEN_KEY);
export const userTypeTokenCookie =
	createCookieStorage<UserType>(USER_TYPE_TOKEN_KEY);

export const TEN_DAYS_ms = 1000 * 60 * 60 * 24 * 10;

function createCookieStorage<T extends string>(COOKIE_KEY: string) {
	return {
		set: (data: T, rootPath = "/") => {
			Cookies.set(COOKIE_KEY, data, {
				expires: new Date(Date.now() + TEN_DAYS_ms),
				path: rootPath,
			});
		},
		get: (): T | undefined => {
			const data = Cookies.get(COOKIE_KEY);
			if (data) return data as T;
		},
		delete: () => {
			Cookies.remove(COOKIE_KEY);
		},
	};
}
