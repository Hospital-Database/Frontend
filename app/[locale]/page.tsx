"use client";

import { usePatientSignIn } from "@/api/login";
import ErrorMessage from "@/components/error-msg";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useTranslations } from "next-intl";
import Image from "next/image";
import * as z from "zod";
import Navbar from "./_components/navbar";

export default function Login() {
	return (
		<>
			<Navbar />
			<main className="page-container page-height flex items-center justify-center flex-col gap-y-6 ">
				<section className="w-[min(90%,600px)] bg-neutral-300 dark:bg-neutral-900 px-4 py-8 lg:px-8 rounded-md">
					<section className="space-y-10">
						<Image
							src="/en/icon.png"
							alt="logo"
							width={50}
							height={50}
							className="mx-auto"
						/>
						<PatientLoginForm />
					</section>
				</section>
			</main>
		</>
	);
}

export interface LoginData {
	national_id: string;
}

function PatientLoginForm() {
	const t = useTranslations("Login");
	const loginSchema = z.object({
		national_id: z.string().regex(/^\d{14}$/, "National ID must be 14 digits"),
	});
	const form = useForm<z.infer<typeof loginSchema>>({
		mode: "uncontrolled",
		validate: zodResolver(loginSchema),
	});
	const { mutate, error, isPending } = usePatientSignIn();
	return (
		<form
			className="space-y-7"
			onSubmit={form.onSubmit((loginInfo) => {
				mutate(loginInfo);
			})}
		>
			<ErrorMessage>{error?.detail}</ErrorMessage>
			<div className="space-y-3">
				<TextInput
					label={t("national-id")}
					placeholder={t("national-id-placeholder")}
					{...form.getInputProps("national_id")}
				/>
			</div>
			<Button type="submit" className="w-full" loading={isPending}>
				{t("login")}
			</Button>
		</form>
	);
}
