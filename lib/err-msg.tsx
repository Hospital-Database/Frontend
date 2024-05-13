import { isAxiosError } from "axios";
import { getTranslations } from "next-intl/server";

export async function getErrorMessage(e: unknown): Promise<string> {
	const t = (await getTranslations()) as (key: string) => string;
	return getErrorMessageSync(e, t);
}

export function getErrorMessageSync(
	e: unknown,
	t: (key: string) => string,
): string {
	let msg = t("Common.errors.something-went-wrong");
	if (isAxiosError(e)) msg = e.response?.data?.message || msg;
	return msg;
}
