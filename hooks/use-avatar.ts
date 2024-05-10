import { identicon } from "@dicebear/collection";
import { type StyleOptions, createAvatar } from "@dicebear/core";
import { useMemo } from "react";

export default function useAvatar(
	avatar: string | undefined,
	options?: StyleOptions<Record<string, unknown>>,
) {
	const ava = useMemo(() => {
		if (avatar) return avatar;
		return createAvatar(identicon, {
			size: 100,
			backgroundColor: ["white"],
			backgroundType: ["solid"],
			...options,
		}).toDataUriSync();
	}, [avatar, options]);
	return ava;
}
