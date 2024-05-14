import { availableLocaleCodes } from "@/next.locales";
import { z } from "zod";
import { makeRoutes } from "./utils";

export const LOGIN_REDIRECT = "/login";
export const AFTER_LOGIN_REDIRECT = "/";

export function isAuthPath(str: string) {
	return Routes.login.doesMatch(str);
}

export const Routes = makeRoutes(
	(makeRoute) => {
		return {
			home: makeRoute("/"),
			dashboard: makeRoute("/dashboard", {
				params: z.object({ id: z.string() }),
				type: "admin-only",
			}),
			login: makeRoute("/login", { type: "public" }),
		};
	},
	{
		locales: availableLocaleCodes,
	},
);
