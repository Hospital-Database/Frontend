"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const theme = createTheme({});

export default function App({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={theme}>
				<ProgressBar
					height="4px"
					color="var(--mantine-primary-color-filled)"
					options={{ showSpinner: true }}
					shallowRouting
				/>
				{children}
			</MantineProvider>
		</QueryClientProvider>
	);
}
