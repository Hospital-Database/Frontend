"use client";

import { useSignIn } from "@/api/login";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useTranslations } from "next-intl";
import * as z from "zod";

export interface LoginData {
	username: string;
	password: string;
}

export default function LoginForm() {
	const t = useTranslations("Login");
	const loginSchema = z.object({
		username: z.string().regex(/^(?![-_])[A-Za-z0-9_-]*[A-Za-z0-9]$/, {
			message: t("usernam-error-message"),
		}),
		password: z.string(),
	});
	const form = useForm<z.infer<typeof loginSchema>>({
		mode: "uncontrolled",
		validate: zodResolver(loginSchema),
	});
	const { mutate, error, isPending } = useSignIn();
	return (
		<form
			className="space-y-7"
			onSubmit={form.onSubmit((loginInfo) => {
				mutate(loginInfo);
			})}
		>
			{error?.response?.data.detail && (
				<p className="text-red-600 text-center text-sm">
					{error?.response?.data.detail}
				</p>
			)}
			<div className="space-y-3">
				<TextInput
					label={t("username")}
					placeholder={t("username-placeholder")}
					{...form.getInputProps("username")}
				/>
				<TextInput
					label={t("password")}
					type="password"
					placeholder="**********"
					{...form.getInputProps("password")}
				/>
			</div>
			<Button type="submit" className="w-full" loading={isPending}>
				{t("login")}
			</Button>
		</form>
	);
}
