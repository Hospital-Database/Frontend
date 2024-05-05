"use client";

import { usePathname, useRouter } from "@/navigation";
import { availableLocales, type Locale } from "@/next.locales";
import { Button, Menu } from "@mantine/core";
import { useLocale } from "next-intl";

export default function LangSwitch() {
	const router = useRouter();
	const pathname = usePathname();
	const locale = useLocale();

	const handleChange = (lang: Locale) => {
		router.replace(pathname, { locale: lang });
	};

	return (
		<Menu shadow="md" width={200}>
			<Menu.Target>
				<Button variant="outline" size="icon">
					{availableLocales.find(({ code }) => code === locale)?.localName}
				</Button>
			</Menu.Target>
			<Menu.Dropdown>
				{availableLocales.map(({ code, localName }) => (
					<Menu.Item onClick={() => handleChange(code)}>{localName}</Menu.Item>
				))}
			</Menu.Dropdown>
		</Menu>
	);
}
