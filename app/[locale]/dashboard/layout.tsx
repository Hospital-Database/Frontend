"use client";

import { Link } from "@/navigation";
import {
	AppShell,
	Burger,
	Button,
	Divider,
	Group,
	Stack,
	TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { ThemeSwitch } from "../_components/theme-switch";
import LangSwitch from "../_components/lang-switch";

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
					<div className="hidden md:flex items-center gap-2 h-full grow">
						<SearchField className="md:w-[400px] lg:w-[600px]" />
						<div className="grow" />
						<LangSwitch />
						<ThemeSwitch />
						<Divider orientation="vertical" />
						<Button variant="transparent">Logout</Button>
					</div>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md">
				<SearchField className="w-full mkd:hidden" />
				<Stack gap={"md"} mt="md">
					<NavLink href="/"> Home</NavLink>
					<NavLink href="/dashboard/add-patient">Add-Patient</NavLink>
				</Stack>
				<div className="md:hidden mt-4">
					<Divider mb="md" />
					<div className="gap-2 grid grid-cols-2">
						<LangSwitch />
						<ThemeSwitch />
					</div>
					<Button w={"100%"} mt="md" variant="transparent">
						Logout
					</Button>
				</div>
			</AppShell.Navbar>
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
}

function NavLink({
	href,
	children,
}: { href: string; children: React.ReactNode }) {
	return (
		<Link
			href={href}
			className="p-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-900 rounded"
		>
			{children}
		</Link>
	);
}

function SearchField({ className }: { className?: string }) {
	return (
		<TextInput
			className={className}
			placeholder="Search for patients or other things"
			leftSection="🔎"
		/>
	);
}