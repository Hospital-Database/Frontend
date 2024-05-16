"use client";

// import { Button, TextInput } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { zodResolver } from "mantine-form-zod-resolver";
// import { useTranslations } from "next-intl";
// import * as z from "zod";
// import { useSignIn } from "@/api/login";

export interface LoginData {
	national_id: string;
}

export default function PatientLoginForm() {
	// const t = useTranslations("Login");
	// const loginSchema = z.object({
	// 	national_id: z.string().regex(/^\d{14}$/, "National ID must be 14 digits"),
	// });
	// const form = useForm<z.infer<typeof loginSchema>>({
	// 	mode: "uncontrolled",
	// 	validate: zodResolver(loginSchema),
	// });
	// const { mutate, error, isPending } = useSignIn();
	// return (
	// 	<form
	// 		className="space-y-7"
	// 		onSubmit={form.onSubmit((loginInfo) => {
	// 			mutate(loginInfo);
	// 		})}
	// 	>
	// 		{error?.response?.data.detail && (
	// 			<p className="text-red-600 text-center text-sm">
	// 				{error?.response?.data.detail}
	// 			</p>
	// 		)}
	// 		<div className="space-y-3">
	// 			<TextInput
	// 				label={t("national-id")}
	// 				placeholder={t("username-placeholder")}
	// 				{...form.getInputProps("national_id")}
	// 			/>
	// 		</div>
	// 		<Button type="submit" className="w-full" loading={isPending}>
	// 			{t("login")}
	// 		</Button>
	// 	</form>
	// );
	return null;
}
