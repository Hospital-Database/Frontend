"use client";

import {
	type doctorSchema,
	useCreateDoctor,
	useDeleteDoctor,
	useRestoreDoctor,
	useUpdateDoctor,
} from "@/api/doctors";
import DoctorForm from "@/components/forms/doctor";
import { Box, Button, Flex, Menu, SegmentedControl } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { MantineReactTable } from "mantine-react-table";
import { useState } from "react";
import type { z } from "zod";
import useDoctorsTable from "./use-doctors-table";

export default function DoctorsCRUDTable() {
	const [tab, setTab] = useState<"deleted" | "current">("current");
	const [formState, setFormState] = useState<"update" | "create">();
	const [initialValues, setInitialValues] = useState<
		z.infer<typeof doctorSchema> & { id?: string }
	>();

	const queryClient = useQueryClient();
	const createDoctor = useCreateDoctor();
	const updateDoctor = useUpdateDoctor();
	const deleteDoctor = useDeleteDoctor({
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["doctors"],
			});
		},
	});
	const restoreDoctor = useRestoreDoctor({
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["doctors"],
			});
		},
	});

	const doctorsTable = useDoctorsTable({
		deleted: tab === "deleted",
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
					{tab === "deleted" ? (
						<Menu.Item
							disabled={restoreDoctor.isPending}
							onClick={() => restoreDoctor.mutateAsync(row.original.id)}
						>
							Restore
						</Menu.Item>
					) : (
						<Menu.Item
							disabled={deleteDoctor.isPending}
							onClick={() => deleteDoctor.mutateAsync(row.original.id)}
						>
							Delete
						</Menu.Item>
					)}
				</>
			),
		},
	});

	return (
		<Box>
			<Flex mb="md" justify="space-between">
				<SegmentedControl
					radius="xl"
					data={[
						{ value: "current", label: "Current" },
						{
							value: "deleted",
							label: "Deleted",
						},
					]}
					onChange={(val) => {
						setTab(val as "deleted" | "current");
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
					if (formState === "create") return createDoctor.mutateAsync(data);
					if (!initialValues?.id)
						throw new Error("Can't find the ID being updated");
					return updateDoctor.mutateAsync({ ...data, id: initialValues?.id });
				}}
				opened={!!formState}
				onSuccess={() => setFormState(undefined)}
				onClose={() => setFormState(undefined)}
				initialValues={initialValues}
			/>
		</Box>
	);
}
