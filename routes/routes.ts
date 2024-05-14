import { availableLocaleCodes } from "@/next.locales";
import { type RouteType, makeRoutes } from "./utils";

export const LOGIN_REDIRECT = "/login";
export const AFTER_LOGIN_REDIRECT = "/";

export const Routes = makeRoutes(
	(makeRoute) => {
		return {
			home: makeRoute("/"),
			dashboard: makeRoute("/dashboard", {
				type: "admin-only",
			}),
			login: makeRoute("/login", { type: "public" }),
		};
	},
	{
		locales: availableLocaleCodes,
	},
);

export function checkRouteType(path: string, type: RouteType) {
	for (const route of Object.values(Routes))
		if (route.doesMatch(path) && route.type === type) return true;
	return false;
}
