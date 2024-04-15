"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type locale, usePathname, useRouter } from "@/navigation";
import { useLocale } from "next-intl";

export default function LangSwitch() {
	const router = useRouter();
	const pathname = usePathname();
	const locale = useLocale();

	const handleChange = (lang: locale) => {
		router.replace(pathname, { locale: lang });
	};

	return (
		<Select onValueChange={(lang: locale) => handleChange(lang)}>
			<SelectTrigger className="w-[180px]">
				<SelectValue
					placeholder={locale === "ar" ? "العربيه (مصر)" : "English(UK)"}
				/>
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="ar">العربية (مصر)</SelectItem>
				<SelectItem value="en">English(UK)</SelectItem>
			</SelectContent>
		</Select>
	);
}
