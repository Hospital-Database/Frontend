"use client";

import {
	type doctorSchema,
	useCreateDoctor,
	useUpdateDoctor,
} from "@/api/doctors";
import DoctorForm from "@/components/forms/doctor";
import { Box, Button, Flex, Menu, SegmentedControl } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { MantineReactTable } from "mantine-react-table";
import { useState } from "react";
import type { z } from "zod";
import useDoctorsTable from "./use-doctors-table";

export default function DoctorsCRUDTable() {
	const [formState, setFormState] = useState<"update" | "create">();
	const [initialValues, setInitialValues] = useState<
		z.infer<typeof doctorSchema> & { id?: number }
	>();

	const doctorsTable = useDoctorsTable({
		tableOptions: {
			renderRowActionMenuItems: ({ row }) => (
				<>
					<Menu.Item
						onClick={() => {
							setInitialValues({
								...row.original,
								date_of_birth: new Date(row.original.date_of_birth),
								phone: row.original.phone || {},
								address: row.original.address || {},
							});
							setFormState("update");
						}}
					>
						Edit
					</Menu.Item>
					<Menu.Item onClick={() => console.info("Deactivate")}>
						Deactivate
					</Menu.Item>
					<Menu.Item onClick={() => console.info("Delete")}>Delete</Menu.Item>
				</>
			),
		},
	});

	const { mutateAsync: createDoctor } = useCreateDoctor();
	const { mutateAsync: updateDoctor } = useUpdateDoctor();

	return (
		<Box>
			<Flex mb="md" justify="space-between">
				<SegmentedControl
					radius="xl"
					data={["Current", "Deleted"]}
					onChange={(val) => {
						doctorsTable.setColumnFilters((prev) => {
							return [
								...prev.filter(({ id }) => id !== "deleted"),
								{ id: "deleted", value: (val === "Deleted").toString() },
							];
						});
					}}
				/>
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
