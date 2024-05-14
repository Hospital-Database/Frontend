import { getDoctors } from "@/api/doctors";
import type { Doctor } from "@/lib/types";
import { Menu } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import type { MRT_ColumnDef, MRT_TableOptions } from "mantine-react-table";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useMemo, useState } from "react";
import useDatagrid from "./use-datagrid";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/lib/axios";
import { getErrorMessageSync } from "@/lib/err-msg";
import { useTranslations } from "next-intl";
import { notifyError } from "@/lib/notifications";

const doctorSchema = z.object({
	full_name: z.string().min(2),
	national_id: z.string().regex(/^\d{14}$/, "National ID must be 14 digits"),
	gender: z.literal("M").or(z.literal("F")).optional(),
	speciality: z.string().min(2),
	license_number: z.string().optional(),
	experience_years: z.number().optional(),
	work_days: z.string().optional(),
	email: z.string().optional(),
	marital_status: z.string().optional(),
	nationality: z.string().min(3),
	notes: z.string().optional(),
	address: z
		.object({
			street: z.string().optional(),
			city: z.string().optional(),
			governorate: z.string().optional(),
		})
		.optional(),
	phone: z
		.object({
			mobile: z.string().optional(),
		})
		.optional(),
	/** date in ISO format */
	date_of_birth: z.date().optional(),
});

export default function useDoctorsTable() {
	const t = useTranslations();
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string[] | undefined>
	>({});

	console.log(validationErrors);

	const columns = useMemo<MRT_ColumnDef<Doctor>[]>(
		() => [
			{
				accessorKey: "full_name",
				header: "Full name",
				mantineEditTextInputProps: {
					error: validationErrors.full_name,
				},
			},
			{
				accessorKey: "speciality",
				header: "Speciality",
				mantineEditTextInputProps: {
					error: validationErrors.speciality,
				},
			},
			{
				accessorKey: "national_id",
				header: "National ID",
				mantineEditTextInputProps: {
					error: validationErrors.national_id,
				},
			},
			{
				accessorKey: "nationality",
				header: "Nationality",
				mantineEditTextInputProps: {
					error: validationErrors.nationality,
				},
			},
			{
				accessorKey: "phone.mobile",
				header: "Phone",
				mantineEditTextInputProps: {
					error: validationErrors.phone,
				},
			},
		],
		[validationErrors],
	);

	const { mutateAsync: createDoctor, isPending: isCreatingDoctor } =
		useCreateDoctor();

	//CREATE action
	const handleCreateDoctor: MRT_TableOptions<Doctor>["onCreatingRowSave"] =
		async ({ values, exitCreatingMode }) => {
			const validation = doctorSchema.safeParse(values);

			if (validation.success === false) {
				setValidationErrors(validation.error.formErrors.fieldErrors);
				return;
			}

			setValidationErrors({});
			try {
				await createDoctor(values);
				exitCreatingMode();
			} catch (e) {
				const message = getErrorMessageSync(e, t);
				notifyError({ title: "Doctor is not created", message });
			}
		};

	return useDatagrid(getDoctors, {
		columns,
		enableRowActions: true,
		enableEditing: true,
		editDisplayMode: "modal",
		onCreatingRowSave: handleCreateDoctor,
		state: {
			isSaving: isCreatingDoctor,
		},
		renderRowActionMenuItems: ({ row: _ }) => (
			<>
				<Menu.Item onClick={() => console.info("Deactivate")}>
					Deactivate
				</Menu.Item>
				<Menu.Item onClick={() => console.info("Delete")}>Delete</Menu.Item>
			</>
		),
	});
}

function useCreateDoctor() {
	return useMutation({
		mutationFn: (data: z.output<typeof doctorSchema>) => {
			return http.post("/accounts/doctor/", data);
		},
	});
}
