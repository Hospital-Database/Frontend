import { useTranslations } from "next-intl";

export default function Home() {
	const t = useTranslations("Home");
	return (
		<main className="page-container ">
			<p>{t("hello-world")}</p>
		</main>
	);
}
