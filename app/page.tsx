"use client";
import { EuiProvider, EuiText } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_dark.css";
import React from "react";

export default function Home() {
	return (
		<EuiProvider colorMode="dark">
			<EuiText>
				<p>Hello World!</p>
			</EuiText>
		</EuiProvider>
	);
}
