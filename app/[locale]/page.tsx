"use client";
import { EuiProvider, EuiText } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_dark.css";
import { useTranslations } from "next-intl";
import React from "react";

export default function Home() {
	const t = useTranslations("Home");
	return (
		<EuiProvider colorMode="dark">
			<EuiText>
				<p>{t("hello-world")}
				
				
				
				</p>
			</EuiText>
		</EuiProvider>
	);
}
