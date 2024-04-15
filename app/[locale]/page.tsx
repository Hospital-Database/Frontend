import { useTranslations } from "next-intl";

export default function Home() {
	const t = useTranslations("Home");
	return (
		<div>
			<p>{t("hello-world")}</p>
		</div>
	);
}
