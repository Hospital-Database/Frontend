import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import type { Address } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// source: https://www.totaltypescript.com/forwardref-with-generic-components
export function fixedForwardRef<T, P = Record<string, never>>(
	render: (props: P, ref: React.Ref<T>) => React.ReactNode,
) {
	return React.forwardRef(render) as (
		props: P & React.RefAttributes<T>,
	) => React.ReactNode;
}

export function formatAddress(address: Address | null) {
	if (!address) return "N/A";

	return `${address.governorate || "N/A"}, ${address.city || "N/A"}, ${
		address.street || "N/A"
	}`;
}
