"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const theme = createTheme({
	/** Put your mantine theme override here */
});

export default function App({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();
	return (
		<MantineProvider theme={theme}>
			{/* <QueryClientProvider> */}
			<ProgressBar
				height="4px"
				color="var(--mantine-primary-color-filled)"
				options={{ showSpinner: true }}
				shallowRouting
			/>
			<QueryClientProvider client={queryClient}>
				<HydrationBoundary>{children}</HydrationBoundary>
			</QueryClientProvider>
		</MantineProvider>
	);
}
