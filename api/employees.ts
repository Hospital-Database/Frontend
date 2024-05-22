import type { FetchOptions } from "@/hooks/use-our-table";
import { http } from "@/lib/axios";
import { getErrorMessageSync } from "@/lib/err-msg";
import getTableSearchParams from "@/lib/get-search-params";
import { notifyError, notifySuccess } from "@/lib/notifications";
import type { Employee } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const employeeSchema = z.object({
	full_name: z.string().min(2),
	national_id: z.string().regex(/^\d{14}$/, "National ID must be 14 digits"),
	email: z.preprocess((val) => val || undefined, z.string().optional()),
	nationality: z.string().min(3),
	speciality: z.preprocess(
		(val) => val || undefined,
		z.string().min(3).optional(),
	),
	gender: z.preprocess(
		(val) => val || undefined,
		z.literal("female").or(z.literal("male")).optional(),
	),
	license_number: z.preprocess(
		(val) => val || undefined,
		z.string().optional(),
	),
	experience_years: z.preprocess(
		(val) => val || undefined,
		z.number().optional(),
	),
	work_days: z.preprocess((val) => val || undefined, z.string().optional()),
	marital_status: z.preprocess(
		(val) => val || undefined,
		z.string().optional(),
	),
	notes: z.preprocess((val) => val || undefined, z.string().optional()),
	address: z
		.object({
			street: z.string().optional(),
			city: z.string().optional(),
			governorate: z.string().optional(),
		})
		.optional(),
	// TODO: fix the form to make the phone optional
	phone: z
		.object({
			mobile: z.preprocess(
				(val) => val || undefined,
				z.string().min(3).optional(),
			),
		})
		.optional(),
	/** date in ISO format */
	date_of_birth: z.preprocess((val) => val || undefined, z.date().optional()),
});

// -------- CREATE

export async function createEmployee(
	data: Omit<z.input<typeof employeeSchema>, "date_of_birth"> & {
		date_of_birth?: string;
	},
) {
	return await http.post<Employee>("/accounts/employee/", data);
}

export function useCreateEmployee() {
	const t = useTranslations();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createEmployee,
		onSuccess: () => {
			notifySuccess({
				title: "Employee was added successfully",
			});
			queryClient.invalidateQueries({
				queryKey: ["deleted-employees"],
			});
			queryClient.invalidateQueries({
				queryKey: ["employees"],
			});
		},
		onError: (e) => {
			const message = getErrorMessageSync(e, t);
			notifyError({
				title: "Couldn't create the employee",
				message,
			});
		},
	});
}

// -------- READ

export async function getEmployees(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return await http
		.get<{ count: number; results: Employee[] }>("/accounts/employee/", {
			params,
		})
		.then((res) => res.data);
}

export async function getDeletedEmployees(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return await http
		.get<{ count: number; results: Employee[] }>(
			"/accounts/employee/deleted/",
			{
				params,
			},
		)
		.then((res) => res.data);
}

export function useEmployees(options: FetchOptions) {
	return useQuery({
		queryKey: ["employees", options],
		queryFn: () => getEmployees(options),
	});
}

// -------- UPDATE

export async function updateEmployee(
	allData: Omit<z.input<typeof employeeSchema>, "date_of_birth"> & {
		date_of_birth?: string;
	} & { id: string },
) {
	const { id, ...data } = allData;
	return await http.patch<Employee>(`/accounts/employee/${id}/`, data);
}

export function useUpdateEmployee() {
	const t = useTranslations();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateEmployee,
		onSuccess: () => {
			notifySuccess({
				title: "Employee was updated successfully",
			});
			queryClient.invalidateQueries({
				queryKey: ["deleted-employees"],
			});
			queryClient.invalidateQueries({
				queryKey: ["employees"],
			});
		},
		onError: (e) => {
			const message = getErrorMessageSync(e, t);
			notifyError({
				title: "Couldn't update the employee",
				message,
			});
		},
	});
}

// -------- DELETE

export async function deleteEmployee(
	id: string,
	method: "soft" | "hard" = "soft",
) {
	return await http.delete(`/accounts/employee/${id}/`, {
		params: {
			method,
		},
	});
}

export function useDeleteEmployee() {
	const t = useTranslations();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteEmployee,
		onSuccess: () => {
			notifySuccess({
				title: "Employee was deleted successfully",
			});
			queryClient.invalidateQueries({
				queryKey: ["deleted-employees"],
			});
			queryClient.invalidateQueries({
				queryKey: ["employees"],
			});
		},
		onError: (e) => {
			const message = getErrorMessageSync(e, t);
			notifyError({
				title: "Couldn't delete the employee",
				message,
			});
		},
	});
}

export async function restoreEmployee(id: string) {
	return await http.post(`/accounts/deleted-employee/restore/${id}/`);
}

export function useRestoreEmployee() {
	const t = useTranslations();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: restoreEmployee,
		onSuccess: () => {
			notifySuccess({
				title: "Employee was restored successfully",
			});
			queryClient.invalidateQueries({
				queryKey: ["deleted-employees"],
			});
			queryClient.invalidateQueries({
				queryKey: ["employees"],
			});
		},
		onError: (e) => {
			const message = getErrorMessageSync(e, t);
			notifyError({
				title: "Couldn't restore the employee",
				message,
			});
		},
	});
}
