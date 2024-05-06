import { Link } from "@/navigation";
import { Button, Divider, TextInput } from "@mantine/core";
import LangSwitch from "../../../_components/lang-switch";
import { ThemeSwitch } from "../../../_components/theme-switch";

export default function Navbar() {
	return (
		<nav className="shadow-lg nav-height grid grid-cols-[auto_auto] md:grid-cols-3 p-2 gap-x-3 bg-neutral-100 dark:bg-neutral-900">
			<div />
			<div className="hidden md:flex items-center">
				<TextInput
					className="w-full"
					placeholder="Search for patients or other things"
					leftSection="🔎"
				/>
			</div>
			<div className="flex justify-end items-center gap-2">
				<LangSwitch />
				<ThemeSwitch />
				<Divider orientation="vertical" />
				<Link href="/login">
					<Button>Login</Button>
				</Link>
			</div>
		</nav>
	);
}
