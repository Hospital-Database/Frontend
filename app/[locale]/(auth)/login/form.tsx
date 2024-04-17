"use client";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	type FieldValues,
	FormProvider,
	type SubmitHandler,
	useForm,
} from "react-hook-form";
import { loginSchema } from "./shema";
export default function LoginForm() {
	const form = useForm({
		resolver: zodResolver(loginSchema),
	});
	const handleLoginSubmt: SubmitHandler<FieldValues> = (data) => {
		console.log(data);
	};
	return (
		<FormProvider {...form}>
			<form
				className="space-y-7"
				onSubmit={form.handleSubmit(handleLoginSubmt)}
			>
				<div className="space-y-3">
					<FormInput name="username" />
					<FormInput name="password" />
				</div>
				<Button rounded type="submit" className="w-full">
					Login
				</Button>
			</form>
		</FormProvider>
	);
}
