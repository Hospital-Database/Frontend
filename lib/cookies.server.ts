import "server-only";

import { cookies } from "next/headers";
import {
	ACCESS_TOKEN_KEY,
	REFRESH_TOKEN_KEY,
	TEN_DAYS_ms,
} from "./cookies.client";

export const accessTokenCookie = createCookieStorage(ACCESS_TOKEN_KEY);
export const refreshTokenCookie = createCookieStorage(REFRESH_TOKEN_KEY);

function createCookieStorage(COOKIE_KEY: string) {
	return {
		set: (data: string, rootPath: string) => {
			cookies().set(COOKIE_KEY, data, {
				expires: new Date(Date.now() + TEN_DAYS_ms),
				path: rootPath,
			});
		},
		get: () => {
			const data = cookies().get(COOKIE_KEY);
			if (data) return data.value;
		},
		delete: () => {
			cookies().delete(COOKIE_KEY);
		},
	};
}
