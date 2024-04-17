import LangSwitch from "./lang-switch";
import { ThemeSwitch } from "./theme-switch";

export default function Navbar() {
	return (
		<main className="shadow-lg  nav-height flex items-center justify-end p-2 gap-x-3 bg-neutral-100  dark:bg-neutral-900 ">
			<LangSwitch />
			<ThemeSwitch />
		</main>
	);
}
