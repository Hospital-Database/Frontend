// source: https://www.flightcontrol.dev/blog/fix-nextjs-routing-to-have-full-type-safety

import {
	type ReadonlyURLSearchParams,
	useParams as useNextParams,
	useSearchParams as useNextSearchParams,
} from "next/navigation";
import { compile, pathToRegexp } from "path-to-regexp";
import { z } from "zod";

export type RouteType = "public" | "private" | "admin-only" | "auth";

export type RouteBuilder<
	Params extends z.ZodSchema,
	Search extends z.ZodSchema,
> = {
	(
		p?: z.input<Params>,
		options?: { search?: z.input<Search> } & Parameters<typeof compile>[1],
	): string;
	parse: (input: z.input<Params>) => z.output<Params>;
	useParams: () => z.output<Params>;
	useSearchParams: () => z.output<Search>;
	params: z.output<Params>;
	search: z.output<Params>;
	doesMatch: (path: string) => boolean;
	type?: RouteType;
};

export type RouteOptions<
	Params extends z.ZodSchema,
	Search extends z.ZodSchema,
> = {
	params?: Params;
	search?: Search;
	type?: RouteBuilder<Params, Search>["type"];
};

export type RoutesOptions = {
	locales?: string[];
};

const empty: z.ZodSchema = z.object({});

export function makeRouteInner<
	Params extends z.ZodSchema,
	Search extends z.ZodSchema,
>(
	route: string,
	options: RouteOptions<Params, Search> = {},
	globalOptions: RoutesOptions = {},
): RouteBuilder<Params, Search> {
	if (route[0] !== "/") {
		throw new Error(`Route must start with /: ${route}`);
	}

	const {
		params: paramsSchema = empty as Params,
		search: searchSchema = empty as Search,
		type,
	} = options;

	const { locales = [] } = globalOptions;

	const routeBuilder: RouteBuilder<Params, Search> = (
		params,
		{ search, ...options } = {},
	) => {
		const toPath = compile<Params>(route, {
			encode: encodeURIComponent,
			...options,
		});
		const baseUrl = toPath(params);
		const searchString = search && new URLSearchParams(search).toString();
		return [baseUrl, searchString ? `?${searchString}` : ""].join("");
	};

	routeBuilder.parse = function parse(args: z.input<Params>): z.output<Params> {
		const res = paramsSchema.safeParse(args);
		if (!res.success) {
			throw new Error(
				`Invalid route params for ${route}: ${res.error.message}`,
			);
		}
		return res.data;
	};

	routeBuilder.useParams = function useParams(): z.output<Params> {
		const res = paramsSchema.safeParse(useNextParams());
		if (!res.success) {
			throw new Error(
				`Invalid route params for ${route}: ${res.error.message}`,
			);
		}
		return res.data;
	};

	routeBuilder.useSearchParams = function useSearchParams(): z.output<Search> {
		const res = searchSchema.safeParse(
			convertURLSearchParamsToObject(useNextSearchParams()),
		);
		if (!res.success) {
			throw new Error(
				`Invalid search params for ${route}: ${res.error.message}`,
			);
		}
		return res.data;
	};

	routeBuilder.doesMatch = function doesMatch(
		path: string,
		options?: Parameters<typeof pathToRegexp>[2],
	): boolean {
		const newRoute = `/(${locales.join("|")})?${route === "/" ? "" : route}`;
		const re = pathToRegexp(newRoute, undefined, options);
		return re.test(path);
	};

	routeBuilder.type = type;

	// set the type
	routeBuilder.params = undefined as z.output<Params>;
	routeBuilder.search = undefined as z.output<Search>;
	// set the runtime getter
	Object.defineProperty(routeBuilder, "params", {
		get() {
			throw new Error(
				"Routes.[route].params is only for type usage, not runtime. Use it like `typeof Routes.[routes].params`",
			);
		},
	});
	Object.defineProperty(routeBuilder, "search", {
		get() {
			throw new Error(
				"Routes.[route].params is only for type usage, not runtime. Use it like `typeof Routes.[routes].params`",
			);
		},
	});

	return routeBuilder;
}

export function makeRoutes<T>(
	maker: (
		make: <Params extends z.ZodSchema, Search extends z.ZodSchema>(
			route: string,
			options?: RouteOptions<Params, Search>,
		) => RouteBuilder<Params, Search>,
	) => T,
	globalOptions: RoutesOptions = {},
): T {
	return maker((route, options) =>
		makeRouteInner(route, options, globalOptions),
	);
}

function convertURLSearchParamsToObject(
	params: ReadonlyURLSearchParams | null,
): Record<string, string | string[]> {
	if (!params) {
		return {};
	}

	const obj: Record<string, string | string[]> = {};
	for (const [key, value] of params.entries()) {
		if (params.getAll(key).length > 1) {
			obj[key] = params.getAll(key);
		} else {
			obj[key] = value;
		}
	}
	return obj;
}
