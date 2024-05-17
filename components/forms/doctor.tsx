import {
	type createDoctor,
	doctorSchema,
	type useCreateDoctor,
} from "@/api/doctors";
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

type DoctorFormProps = NonNullable<Parameters<typeof useCreateDoctor>[0]> &
	Omit<ModalProps, "onSubmit" | "children"> & {
		onSubmit: (
			data: Parameters<typeof createDoctor>[0],
		) => ReturnType<typeof createDoctor>;
		initialValues?: z.infer<typeof doctorSchema>;
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

	initialValues?.gender;

	useCheckDoctorNationalId(form, initialValues?.national_id);

	return (
		<Modal {...props}>
			<form
				onSubmit={form.onSubmit((data) => {
					const newData = {
						...data,
						date_of_birth: data?.date_of_birth?.toISOString().slice(0, 10),
					};
					saveDoctor.mutate(newData);
				})}
			>
				<Stack>
					<TextInput
						withAsterisk
						label="Full name"
						{...form.getInputProps("full_name")}
					/>
					<div className="space-y-2">
						<TextInput
							withAsterisk
							label="National ID"
							{...form.getInputProps("national_id")}
						/>
					</div>
					<TextInput label="Speciality" {...form.getInputProps("speciality")} />
					<TextInput
						label="Nationality"
						{...form.getInputProps("nationality")}
					/>
					<TextInput
						label="Email"
						type="email"
						{...form.getInputProps("email")}
					/>
					<TextInput label="Phone" {...form.getInputProps("phone.mobile")} />
					<Radio.Group label={t("gender")} {...form.getInputProps("gender")}>
						<Group>
							<Radio value="male" label={t("male")} />
							<Radio value="female" label={t("female")} />
						</Group>
					</Radio.Group>
					<Button mt="md" type="submit" loading={saveDoctor.isPending}>
						Save
					</Button>
				</Stack>
			</form>
		</Modal>
	);
}
