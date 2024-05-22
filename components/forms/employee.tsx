import { type createEmployee, employeeSchema } from "@/api/employees";
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

type EmployeeFormProps = Omit<ModalProps, "onSubmit" | "children"> & {
	onSubmit: (
		data: Parameters<typeof createEmployee>[0],
	) => ReturnType<typeof createEmployee>;
	initialValues?: z.infer<typeof employeeSchema>;
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

export default function EmployeeForm({
	onSuccess,
	initialValues,
	onSubmit,
	...props
}: EmployeeFormProps) {
	const t = useTranslations("Forms");
	const form = useForm<z.infer<typeof employeeSchema>>({
		mode: "uncontrolled",
		validate: zodResolver(employeeSchema),
		initialValues: initialValues || emptyValues,
	});

	useEffect(() => {
		if (props.opened) {
			form.setValues(initialValues || emptyValues);
		}
	}, [props.opened, initialValues, form.setValues]);

	const saveEmployee = useMutation({
		mutationFn: onSubmit,
		onSuccess,
	});

	useEffect(() => {
		if (saveEmployee.isError) {
			const errors = saveEmployee.error as unknown as Record<string, string[]>;
			for (const key in errors) {
				form.setFieldError(key, errors[key]);
			}
		}
	}, [saveEmployee.isError, saveEmployee.error, form.setFieldError]);

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
					saveEmployee.mutate(newData);
				})}
			>
				<Stack>
					<TextInput
						withAsterisk
						label={t("full-name")}
						{...form.getInputProps("full_name")}
					/>
					<TextInput
						withAsterisk
						label={t("national-id")}
						{...form.getInputProps("national_id")}
					/>
					<TextInput
						withAsterisk
						label={t("nationality")}
						{...form.getInputProps("nationality")}
					/>
					<TextInput
						label={t("speciality")}
						{...form.getInputProps("speciality")}
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
					<Button mt="md" type="submit" loading={saveEmployee.isPending}>
						{t("save")}
					</Button>
				</Stack>
			</form>
		</Modal>
	);
}
