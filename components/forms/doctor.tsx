import { type createDoctor, doctorSchema } from "@/api/doctors";
import {
	Button,
	Group,
	Modal,
	type ModalProps,
	Radio,
	Stack,
	TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import type { z } from "zod";
import useCheckDoctorNationalId from "./use-check-doctor-national-id";

type DoctorFormProps = Omit<ModalProps, "onSubmit" | "children"> & {
	onSubmit: (
		data: Parameters<typeof createDoctor>[0],
	) => ReturnType<typeof createDoctor>;
	initialValues?: z.infer<typeof doctorSchema>;
	onSuccess?: () => void;
};

export const emptyValues = {
	full_name: "",
	national_id: "",
	nationality: "",
	speciality: "",
	phone: {},
	address: {},
};

export default function DoctorForm({
	onSuccess,
	initialValues,
	onSubmit,
	...props
}: DoctorFormProps) {
	const t = useTranslations("Forms");
	const form = useForm<z.infer<typeof doctorSchema>>({
		mode: "uncontrolled",
		validate: zodResolver(doctorSchema),
		initialValues: initialValues || emptyValues,
	});

	useEffect(() => {
		if (props.opened) {
			form.setValues(initialValues || emptyValues);
		}
	}, [props.opened, initialValues, form.setValues]);

	const saveDoctor = useMutation({
		mutationFn: onSubmit,
		onSuccess,
	});

	useCheckDoctorNationalId(
		!saveDoctor.isError,
		form,
		initialValues?.national_id,
	);

	useEffect(() => {
		if (saveDoctor.isError) {
			const errors = saveDoctor.error as unknown as Record<string, string[]>;
			for (const key in errors) {
				form.setFieldError(key, errors[key]);
			}
		}
	}, [saveDoctor.isError, saveDoctor.error, form.setFieldError]);

	return (
		<Modal {...props}>
			<form
				onSubmit={form.onSubmit(({ national_id, ...data }) => {
					const newData = {
						...data,
						national_id:
							national_id === initialValues?.national_id
								? undefined
								: national_id,
						date_of_birth: data?.date_of_birth?.toISOString().slice(0, 10),
					};
					// @ts-ignore
					saveDoctor.mutate(newData);
				})}
			>
				<Stack>
					<TextInput
						withAsterisk
						label={t("full-name")}
						{...form.getInputProps("full_name")}
					/>
					<div className="space-y-2">
						<TextInput
							withAsterisk
							label={t("national-id")}
							{...form.getInputProps("national_id")}
						/>
					</div>
					<TextInput
						label={t("speciality")}
						{...form.getInputProps("speciality")}
					/>
					<TextInput
						label={t("nationality")}
						{...form.getInputProps("nationality")}
					/>
					<TextInput
						label={t("email")}
						type="email"
						{...form.getInputProps("email")}
					/>
					<TextInput
						label={t("phone-number")}
						{...form.getInputProps("phone.mobile")}
					/>
					<Radio.Group label={t("gender")} {...form.getInputProps("gender")}>
						<Group>
							<Radio value="male" label={t("male")} />
							<Radio value="female" label={t("female")} />
						</Group>
					</Radio.Group>
					<Button mt="md" type="submit" loading={saveDoctor.isPending}>
						{t("save")}
					</Button>
				</Stack>
			</form>
		</Modal>
	);
}
