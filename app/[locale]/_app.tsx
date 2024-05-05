import { MantineProvider, createTheme } from "@mantine/core";
import { ThemeProvider } from "next-themes";
import { LocaleProvider } from "./_components/locale-provider";

const theme = createTheme({
	/** Put your mantine theme override here */
});

export default function App({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			<LocaleProvider>
				<MantineProvider theme={theme}>{children}</MantineProvider>
			</LocaleProvider>
		</ThemeProvider>
	);
}
