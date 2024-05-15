import {
	type createDoctor,
	doctorSchema,
	type useCreateDoctor,
} from "@/api/doctors";
import {
	Button,
	Modal,
	type ModalProps,
	Stack,
	TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import type { z } from "zod";

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

	return (
		<Modal {...props}>
			<form onSubmit={form.onSubmit(() => {})}>
				<Stack>
					<TextInput
						withAsterisk
						label="Full name"
						{...form.getInputProps("full_name")}
					/>
					<TextInput
						withAsterisk
						label="National ID"
						{...form.getInputProps("national_id")}
					/>
					<TextInput
						withAsterisk
						label="Nationality"
						{...form.getInputProps("nationality")}
					/>
					<TextInput
						withAsterisk
						label="Speciality"
						{...form.getInputProps("speciality")}
					/>
					<TextInput label="Phone" {...form.getInputProps("phone.mobile")} />
					<Button
						mt="md"
						type="submit"
						loading={saveDoctor.isPending}
						onClick={() => {
							const data = form.getValues();
							const newData = {
								...data,
								date_of_birth: data?.date_of_birth?.toISOString().slice(0, 10),
							};
							saveDoctor.mutate(newData);
						}}
					>
						Save
					</Button>
				</Stack>
			</form>
		</Modal>
	);
}
