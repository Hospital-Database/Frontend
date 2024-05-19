"use client";

import {
	type employeeSchema,
	useCreateEmployee,
	useDeleteEmployee,
	useRestoreEmployee,
	useUpdateEmployee,
} from "@/api/employees";
import EmployeeForm from "@/components/forms/employee";
import { Box, Button, Flex, Menu, SegmentedControl } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { MantineReactTable } from "mantine-react-table";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { z } from "zod";
import useEmployeesTable from "./use-employees-table";

export default function EmployeesCRUDTable() {
	const [tab, setTab] = useState<"deleted" | "current">("current");
	const [formState, setFormState] = useState<"update" | "create">();
	const [initialValues, setInitialValues] = useState<
		z.infer<typeof employeeSchema> & { id?: string }
	>();
	const t = useTranslations("Employees");

	const createEmployee = useCreateEmployee();
	const updateEmployee = useUpdateEmployee();
	const deleteEmployee = useDeleteEmployee();
	const restoreEmployee = useRestoreEmployee();

	const employeesTable = useEmployeesTable({
		deleted: tab === "deleted",
		tableOptions: {
			renderRowActionMenuItems: ({ row }) => (
				<>
					<Menu.Item
						onClick={() => {
							const employee = row.original;
							setInitialValues({
								id: employee.id,
								full_name: employee.full_name,
								date_of_birth: new Date(employee.date_of_birth),
								phone: employee.phone || {},
								address: employee.address || {},
								national_id: employee.national_id,
								speciality: employee.speciality,
								nationality: employee.nationality,
								gender: employee.gender,
							});
							setFormState("update");
						}}
					>
						{t("edit")}
					</Menu.Item>
					{tab === "deleted" ? (
						<Menu.Item
							disabled={restoreEmployee.isPending}
							onClick={() => restoreEmployee.mutateAsync(row.original.id)}
						>
							{t("restore")}
						</Menu.Item>
					) : (
						<Menu.Item
							disabled={deleteEmployee.isPending}
							onClick={() => deleteEmployee.mutateAsync(row.original.id)}
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
					{t("add-employee")}
				</Button>
			</Flex>
			<MantineReactTable table={employeesTable} />
			<EmployeeForm
				onSubmit={(data) => {
					if (formState === "create") return createEmployee.mutateAsync(data);
					if (!initialValues?.id)
						throw new Error("Can't find the ID being updated");
					return updateEmployee.mutateAsync({ ...data, id: initialValues?.id });
				}}
				opened={!!formState}
				onSuccess={() => setFormState(undefined)}
				onClose={() => setFormState(undefined)}
				initialValues={initialValues}
			/>
		</Box>
	);
}
