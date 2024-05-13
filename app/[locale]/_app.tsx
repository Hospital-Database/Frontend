"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const theme = createTheme({});

const queryClient = new QueryClient();

export default function App({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
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
