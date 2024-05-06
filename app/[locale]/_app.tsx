"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const theme = createTheme({
	/** Put your mantine theme override here */
});

export default function App({ children }: { children: React.ReactNode }) {
	return (
		<MantineProvider theme={theme}>
			<ProgressBar
				height="4px"
				color="var(--mantine-primary-color-filled)"
				options={{ showSpinner: true }}
				shallowRouting
			/>
			{children}
		</MantineProvider>
	);
}
