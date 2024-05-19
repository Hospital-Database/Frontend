"use client";

import { useI18nZodErrors } from "@/lib/use-I18n-zod-errors";
import { MantineProvider, createTheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const theme = createTheme({});

const queryClient = new QueryClient();

export default function App({
	children,
	langDir,
}: { children: React.ReactNode; langDir: string }) {
	useI18nZodErrors();
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{/** @ts-expect-error */}
			<MantineProvider theme={{ ...theme, dir: langDir }}>
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
