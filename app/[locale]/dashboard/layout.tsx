"use client";

import Logout from "@/app/[locale]/_components/logout";
import { Link } from "@/navigation";
import {
	AppShell,
	Burger,
	Button,
	Divider,
	Group,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
	IconDashboard,
	IconPlus,
	IconStethoscope,
	IconUser,
} from "@tabler/icons-react";
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
					<div className="hidden md:flex items-center gap-2 h-full grow">
						<SearchField className="min-w-0 md:basis-[300px] lg:basis-[600px] shrink" />
						<div className="grow" />
						<AddPatientButton />
						<LangSwitch />
						<ThemeSwitch />
						<Divider orientation="vertical" />
						<Logout />
					</div>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md">
				<Text fw="bold" size="xl">
					ZU Hospital
				</Text>
				<SearchField className="w-full md:hidden mt-4" />
				<Stack gap={"md"} mt="md">
					<NavLink href="/dashboard">
						<IconDashboard /> Dashboard
					</NavLink>
					<NavLink href="/dashboard/patients">
						<IconUser /> Patients
					</NavLink>
					<NavLink href="/dashboard/doctors">
						<IconStethoscope /> Doctors
					</NavLink>
				</Stack>
				<div className="md:hidden mt-4">
					<Divider mb="md" />
					<div className="gap-2 grid grid-cols-2">
						<LangSwitch />
						<ThemeSwitch />
					</div>
					<Logout width="100%" mt="md" />
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
			className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900/70 dark:hover:bg-zinc-900 rounded"
		>
			<Group>{children}</Group>
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

function AddPatientButton() {
	return (
		<Link href="/dashboard/add-patient">
			<Button leftSection={<IconPlus />} className="min-w-fit">
				Add patient
			</Button>
		</Link>
	);
}
