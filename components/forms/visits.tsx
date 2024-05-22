import { useDoctors } from "@/api/doctors";
import { visitSchema } from "@/api/visits";
import type { Visit } from "@/lib/types";
import {
	Button,
	Loader,
	Modal,
	MultiSelect,
	Select,
	Stack,
	TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import type { z } from "zod";

export const emptyValues = {
	measurement: {
		height: 0,
		weight: 0,
		blood_pressure: 0,
		temperature: 0,
		pulse: 0,
		oxygen_level: 0,
	},
	visit_number: 0,
	ticket: 0,
	status: "pending",
	notes: "",
	doctors: [],
} satisfies z.infer<typeof visitSchema>;

type VisitFormProps = z.infer<typeof visitSchema> & {
	onSubmit: (
		data: z.infer<typeof visitSchema> | Visit,
	) => z.infer<typeof visitSchema> | Visit;
	initialValues?: Visit;
	onSuccess: (data: z.infer<typeof visitSchema>) => void;
	onClose: () => void;
	opened: boolean;
	formState: "update" | "create" | undefined;
};

export default function VisitForm({
	onSuccess,
	initialValues,
	onSubmit,
	formState,
	...props
}: VisitFormProps) {
	const t = useTranslations("Forms");
	const form = useForm<z.infer<typeof visitSchema> | Visit>({
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
		//@ts-ignore explanation => there is not side effect if we didn't fix the type error
		mutationFn: onSubmit,
		onSuccess,
	});
	const updateVisit = useMutation({
		//@ts-ignore explanation => there is not side effect if we didn't fix the type error
		mutationFn: onSubmit,
		onSuccess,
	});
	const doctors = useDoctors({
		pagination: {
			pageIndex: 0,
			pageSize: 1e6,
		},
	});
	if (!doctors) return <Loader />;
	const doctorsList =
		doctors?.data?.results
			?.filter((item) => item.speciality)
			.map((name) => ({
				value: name.id,
				label: `${name.full_name} (${name.speciality})`,
			})) || [];

	return (
		<Modal {...props}>
			<form
				onSubmit={form.onSubmit((data) => {
					if (formState === "create")
						saveVisit.mutate(data as z.infer<typeof visitSchema>);
					else updateVisit.mutate(data as Visit);
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
					<MultiSelect
						label="doctors"
						placeholder="choose doctor name"
						{...form.getInputProps("doctors")}
						data={doctorsList}
					/>
					<Select
						label="status"
						placeholder="choose status"
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
					<TextInput label="Notes" {...form.getInputProps("notes")} />
					<Button mt="md" type="submit" loading={saveVisit.isPending}>
						{t("save")}
					</Button>
				</Stack>
			</form>
		</Modal>
	);
}
