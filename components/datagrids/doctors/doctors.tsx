"use client";

import { createDoctor, updateDoctor, type doctorSchema } from "@/api/doctors";
import DoctorForm from "@/components/forms/doctor";
import { Box, Button, Flex } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { MantineReactTable } from "mantine-react-table";
import { useState } from "react";
import type { z } from "zod";
import useDoctorsTable from "./use-doctors-table";

export default function DoctorsDatagrid() {
	const [formState, setFormState] = useState<"update" | "create">();
	const [initialValues, setInitialValues] = useState<
		z.infer<typeof doctorSchema> & { id?: number }
	>();
	const doctorsTable = useDoctorsTable({
		onEdit(row) {
			setInitialValues({
				...row.original,
				date_of_birth: new Date(row.original.date_of_birth),
				phone: row.original.phone || {},
				address: row.original.address || {},
			});
			setFormState("update");
		},
	});

	return (
		<Box>
			<Flex justify="end" mb="md">
				<Button
					leftSection={<IconPlus />}
					onClick={() => {
						setInitialValues(undefined);
						setFormState("create");
					}}
				>
					Add doctor
				</Button>
			</Flex>
			<MantineReactTable table={doctorsTable} />
			<DoctorForm
				onSubmit={(data) => {
					console.log(data);
					if (formState === "create") return createDoctor(data);
					if (!initialValues?.id)
						throw new Error("Can't find the ID being updated");
					return updateDoctor({ ...data, id: initialValues?.id });
				}}
				opened={!!formState}
				onSuccess={() => setFormState(undefined)}
				onClose={() => setFormState(undefined)}
				initialValues={initialValues}
			/>
		</Box>
	);
}
