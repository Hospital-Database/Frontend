"use client";

import { Link } from "@/navigation";
import { AppShell, Burger, Button, Divider, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import LangSwitch from "../_components/lang-switch";
import { ThemeSwitch } from "../_components/theme-switch";

export default function CollapseDesktop({
	children,
}: { children: React.ReactNode }) {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
			}}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					<Burger
						opened={mobileOpened}
						onClick={toggleMobile}
						hiddenFrom="sm"
						size="sm"
					/>
					<Burger
						opened={desktopOpened}
						onClick={toggleDesktop}
						visibleFrom="sm"
						size="sm"
					/>
					<Image
						src="/en/icon.png"
						width={30}
						height={30}
						alt="ZU hospital logo"
					/>
					<div className="grow" />
					<LangSwitch />
					<ThemeSwitch />
					<Divider orientation="vertical" />
					<Button variant="transparent">Logout</Button>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md">
				<Link href="/"> Home</Link>
				<Link href="/dashboard/add-patient">Add-Patient</Link>
			</AppShell.Navbar>
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
}
