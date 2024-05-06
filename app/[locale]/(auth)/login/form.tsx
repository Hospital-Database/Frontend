"use client";

import { useRouter } from "@/navigation";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import * as z from "zod";

export const loginSchema = z.object({
	username: z.string().regex(/^(?![-_])[A-Za-z0-9_-]*[A-Za-z0-9]$/, {
		message:
			"Invalid username, it must only contains letters, numbers, _, or - but not at the beggining or at the end",
	}),
	password: z.string(),
});

export default function LoginForm() {
	const router = useRouter();
	const form = useForm({
		validate: zodResolver(loginSchema),
	});
	return (
		<form
			className="space-y-7"
			onSubmit={form.onSubmit((data) => {
				alert(JSON.stringify(data));
				router.push("/");
			})}
		>
			<div className="space-y-3">
				<TextInput
					label="Username"
					placeholder="user-xyz"
					{...form.getInputProps("username")}
				/>
				<TextInput
					label="Password"
					type="password"
					placeholder="**********"
					{...form.getInputProps("password")}
				/>
			</div>
			<Button type="submit" className="w-full">
				Login
			</Button>
		</form>
	);
}
