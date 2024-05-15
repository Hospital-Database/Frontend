import { availableLocaleCodes } from "@/next.locales";
import { z } from "zod";
import { type RouteType, makeRoutes } from "./utils";

export const LOGIN_REDIRECT = "/login";
export const AFTER_LOGIN_REDIRECT = "/";

export const Routes = makeRoutes(
	(makeRoute) => {
		return {
			home: makeRoute("/"),
			login: makeRoute("/login", { type: "public" }),
			dashboard: makeRoute("/dashboard", {
				type: "admin-only",
			}),
			patient: makeRoute("/dashboard/patient/:id", {
				type: "admin-only",
				params: z.object({
					id: z.string().regex(/^\d+$/, "Invalid patient ID").or(z.number()),
				}),
			}),
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
