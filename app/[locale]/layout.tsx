import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";

import { cn } from "@/lib/utils";
import { availableLocalesMap, defaultLocale } from "@/next.locales";
import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import App from "./_app";
import { LocaleProvider } from "./_components/locale-provider";
import Navbar from "./_components/navbar";
import "./globals.css";

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
					<App>
						<Navbar />
						{children}
					</App>
				</LocaleProvider>
			</body>
		</html>
	);
}
