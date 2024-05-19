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
import { MantineReactTable } from "mantine-react-table";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { z } from "zod";
import useDoctorsTable from "./use-doctors-table";

export default function DoctorsCRUDTable() {
	const [tab, setTab] = useState<"deleted" | "current">("current");
	const [formState, setFormState] = useState<"update" | "create">();
	const [initialValues, setInitialValues] = useState<
		z.infer<typeof doctorSchema> & { id?: string }
	>();
	const t = useTranslations("Doctors");

	const createDoctor = useCreateDoctor();
	const updateDoctor = useUpdateDoctor();
	const deleteDoctor = useDeleteDoctor();
	const restoreDoctor = useRestoreDoctor();

	const doctorsTable = useDoctorsTable({
		deleted: tab === "deleted",
		tableOptions: {
			renderRowActionMenuItems: ({ row }) => (
				<>
					<Menu.Item
						onClick={() => {
							const doctor = row.original;
							setInitialValues({
								id: doctor.id,
								full_name: doctor.full_name,
								date_of_birth: new Date(doctor.date_of_birth),
								phone: doctor.phone || {},
								address: doctor.address || {},
								national_id: doctor.national_id,
								speciality: doctor.speciality,
								nationality: doctor.nationality,
								gender: doctor.gender,
							});
							setFormState("update");
						}}
					>
						{t("edit")}
					</Menu.Item>
					{tab === "deleted" ? (
						<Menu.Item
							disabled={restoreDoctor.isPending}
							onClick={() => restoreDoctor.mutateAsync(row.original.id)}
						>
							{t("restore")}
						</Menu.Item>
					) : (
						<Menu.Item
							disabled={deleteDoctor.isPending}
							onClick={() => deleteDoctor.mutateAsync(row.original.id)}
						>
							{t("delete")}
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
						{ value: "current", label: t("current") },
						{
							value: "deleted",
							label: t("deleted"),
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
					{t("add-doctor")}
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
