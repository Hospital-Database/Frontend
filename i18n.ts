import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { availableLocaleCodes, type Locale } from './next.locales';

export default getRequestConfig(async ({ locale }) => {
	if (!availableLocaleCodes.includes(locale as Locale)) notFound();
	return {
		messages: {
			...(await import(`./messages/${locale}.json`)).default,
		},
	};
});
