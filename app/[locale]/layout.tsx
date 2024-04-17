import type { Metadata } from "next";
import { Handlee } from "next/font/google";

import { availableLocalesMap, defaultLocale } from "@/next.locales.mjs";
import { LocaleProvider } from "@/provider/locale-provider";
import { ThemeProvider } from "@/provider/theme-provider";
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
			<body className={handlee.className}>
				<ThemeProvider attribute="class" defaultTheme="system">
					<LocaleProvider>
						<Navbar />
						{children}
					</LocaleProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
