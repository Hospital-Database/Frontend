import { MantineProvider, createTheme } from "@mantine/core";
import { LocaleProvider } from "./_components/locale-provider";

const theme = createTheme({
	/** Put your mantine theme override here */
});

export default function App({ children }: { children: React.ReactNode }) {
	return (
		<LocaleProvider>
			<MantineProvider theme={theme}>{children}</MantineProvider>
		</LocaleProvider>
	);
}
