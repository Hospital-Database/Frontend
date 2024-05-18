import "server-only";

import { cookies } from "next/headers";
import {
	ACCESS_TOKEN_KEY,
	REFRESH_TOKEN_KEY,
	TEN_DAYS_ms,
	USER_TYPE_TOKEN_KEY,
} from "./cookies.client";

export const accessTokenCookie = createCookieStorage(ACCESS_TOKEN_KEY);
export const refreshTokenCookie = createCookieStorage(REFRESH_TOKEN_KEY);
export const userTypeTokenCookie = createCookieStorage(USER_TYPE_TOKEN_KEY);

function createCookieStorage<T extends string>(COOKIE_KEY: string) {
	return {
		set: (data: T, rootPath: string) => {
			cookies().set(COOKIE_KEY, data, {
				expires: new Date(Date.now() + TEN_DAYS_ms),
				path: rootPath,
			});
		},
		get: (): T | undefined => {
			const data = cookies().get(COOKIE_KEY);
			if (data) return data.value as T;
		},
		delete: () => {
			cookies().delete(COOKIE_KEY);
		},
	};
}
