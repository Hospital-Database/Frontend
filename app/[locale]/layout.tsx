import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import { cn } from "@/lib/utils";
import { availableLocalesMap, defaultLocale } from "@/next.locales";
import { ColorSchemeScript } from "@mantine/core";
import App from "./_app";
import { LocaleProvider } from "./_components/locale-provider";

import "./globals.css";
import "@mantine/core/styles.css";

const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Kufi_Arabic({ subsets: ["arabic"] });

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
			<body className={cn(inter.className, noto.className)}>
				<LocaleProvider>
					<App>{children}</App>
				</LocaleProvider>
			</body>
		</html>
	);
}
