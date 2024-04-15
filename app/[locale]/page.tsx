"use client";
import { EuiText, useEuiTheme } from "@elastic/eui";
import { useTranslations } from "next-intl";

export default function Home() {
	const t = useTranslations("Home");
	const { euiTheme } = useEuiTheme();
	console.log(euiTheme.colors.lightShade);
	return (
		<EuiText
			css={{
				background: euiTheme.colors.lightShade,
				padding: euiTheme.size.xl,
			}}
		>
			<p>{t("hello-world")}</p>
		</EuiText>
	);
}
