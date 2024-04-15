"use client";
import {
	type EuiThemeColorMode,
	EuiThemeProvider,
	useEuiTheme,
} from "@elastic/eui";
import React, { type ChangeEvent, type ReactNode, useState } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<EuiThemeColorMode>("dark");
	const { euiTheme } = useEuiTheme();
	const onChange = (theme: ChangeEvent<HTMLSelectElement>) => {
		if (theme?.target) {
			setTheme(theme.target.value as EuiThemeColorMode);
		}
	};
	// console.log(euiTheme.colors.lightShade);
	return (
		<EuiThemeProvider colorMode={theme}>
			<main style={{ backgroundColor: euiTheme.colors.lightShade }}>
				<select value={theme} onChange={(e) => onChange(e)}>
					<option value="dark">Dark</option>
					<option value="light">Light</option>
				</select>
				{children}
			</main>
		</EuiThemeProvider>
	);
}
