import { visitSchema } from "@/api/visits";
import { Button, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import type { z } from "zod";

export const emptyValues = {
	measurement: {
		height: "",
		weight: "",
		blood_pressure: "",
		temperature: "",
		pulse: "",
		oxygen_level: "",
	},
	status: "pending",
	visit_number: "",
	ticket: "",
	notes: "",
} satisfies z.infer<typeof visitSchema>;

type VisitFormProps = z.infer<typeof visitSchema> & {
	onSuccess: () => void;
	initialValues?: z.infer<typeof visitSchema>;
	onSubmit: (data: z.infer<typeof visitSchema>) => void;
	onClose: () => void;
	opened: boolean;
};

export default function VisitForm({
	onSuccess,
	initialValues,
	onSubmit,
	...props
}: VisitFormProps) {
	const t = useTranslations("Forms");
	const form = useForm<z.infer<typeof visitSchema>>({
		mode: "uncontrolled",
		validate: zodResolver(visitSchema),
		initialValues: initialValues || emptyValues,
	});

	useEffect(() => {
		if (props.opened) {
			form.setValues(initialValues || emptyValues);
		}
	}, [props.opened, initialValues, form.setValues]);

	const saveVisit = useMutation({
		mutationFn: onSubmit,
		onSuccess,
	});

	return (
		<Modal {...props}>
			<form
				onSubmit={form.onSubmit((data) => {
					saveVisit.mutate(data);
				})}
			>
				<Stack>
					<TextInput
						withAsterisk
						label="Visit Number"
						{...form.getInputProps("visit_number")}
					/>
					<TextInput
						withAsterisk
						label="Ticket"
						{...form.getInputProps("ticket")}
					/>

					<Select
						label="status"
						{...form.getInputProps("status")}
						data={["pending", "finished", "cancelled"]}
					/>
					<TextInput
						label="height"
						{...form.getInputProps("measurement.height")}
					/>
					<TextInput
						label="weight"
						{...form.getInputProps("measurement.weight")}
					/>
					<TextInput
						label="blood_pressure"
						{...form.getInputProps("measurement.blood_pressure")}
					/>
					<TextInput
						label="temperature"
						{...form.getInputProps("measurement.temperature")}
					/>
					<TextInput
						label="pulse"
						{...form.getInputProps("measurement.pulse")}
					/>
					<TextInput
						label="oxygen_level"
						{...form.getInputProps("measurement.oxygen_level")}
					/>
					<TextInput
						withAsterisk
						label="Notes"
						{...form.getInputProps("notes")}
					/>
					<Button mt="md" type="submit" loading={saveVisit.isPending}>
						{t("save")}
					</Button>
				</Stack>
			</form>
		</Modal>
	);
}
