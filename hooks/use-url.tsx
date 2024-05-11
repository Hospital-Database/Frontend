import { usePathname, useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useURL() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	const setSearchParam = useCallback(
		(name: string, value: string | null | undefined) => {
			const params = new URLSearchParams(searchParams.toString());
			if (typeof value !== "string") params.delete(name);
			else params.set(name, value);
			router.push(`${pathname}?${params}`);
		},
		[router, searchParams, pathname],
	);

	return {
		pathname,
		searchParams,
		setSearchParam,
	};
}
