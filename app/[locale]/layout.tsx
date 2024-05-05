import type { Metadata } from "next";
import { Handlee } from "next/font/google";

import { availableLocalesMap, defaultLocale } from "@/next.locales.mjs";
import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import App from "./_app";
import Navbar from "./_components/navbar";
import "./globals.css";

const handlee = Handlee({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
	title: "Hospital for medical care",
	description: "medical care website",
};

export default function RootLayout({
	children,
	params: { locale },
}: Readonly<{
	children: React.ReactNode;
	params: { locale: string };
}>) {
	const { langDir, hrefLang } = availableLocalesMap[locale] || defaultLocale;
	return (
		<html lang={hrefLang} dir={langDir} suppressHydrationWarning>
			<head>
				<ColorSchemeScript />
			</head>
			<body className={handlee.className}>
				<App>
					<Navbar />
					{children}
				</App>
			</body>
		</html>
	);
}
