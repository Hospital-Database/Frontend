import type { FetchOptions } from "@/hooks/use-our-table";
import { http } from "@/lib/axios";
import { getErrorMessageSync } from "@/lib/err-msg";
import getTableSearchParams from "@/lib/get-search-params";
import { notifyError, notifySuccess } from "@/lib/notifications";
import type { Doctor } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const doctorSchema = z.object({
	full_name: z.string().min(2),
	national_id: z.string().regex(/^\d{14}$/, "National ID must be 14 digits"),
	email: z.preprocess((val) => val || undefined, z.string().optional()),
	speciality: z.string().min(2),
	nationality: z.string().min(3),
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

export async function createDoctor(
	data: Omit<z.input<typeof doctorSchema>, "date_of_birth"> & {
		date_of_birth?: string;
	},
) {
	return await http.post<Doctor>("/accounts/doctor/", data);
}

export function useCreateDoctor() {
	const t = useTranslations();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createDoctor,
		onSuccess: () => {
			notifySuccess({
				title: "Doctor was added successfully",
			});
			queryClient.invalidateQueries({
				queryKey: ["deleted-doctors"],
			});
			queryClient.invalidateQueries({
				queryKey: ["doctors"],
			});
		},
		onError: (e) => {
			const message = getErrorMessageSync(e, t);
			notifyError({
				title: "Couldn't create the doctor",
				message,
			});
		},
	});
}

// -------- READ

export async function getDoctors(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return await http
		.get<{ count: number; results: Doctor[] }>("/accounts/doctor/", {
			params,
		})
		.then((res) => res.data);
}

export async function getDeletedDoctors(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return await http
		.get<{ count: number; results: Doctor[] }>("/accounts/doctor/deleted/", {
			params,
		})
		.then((res) => res.data);
}

export function useDoctors(options: FetchOptions) {
	return useQuery({
		queryKey: ["doctors", options],
		queryFn: () => getDoctors(options),
	});
}

// -------- UPDATE

export async function updateDoctor(
	allData: Omit<z.input<typeof doctorSchema>, "date_of_birth"> & {
		date_of_birth?: string;
	} & { id: string },
) {
	const { id, ...data } = allData;
	return await http.patch<Doctor>(`/accounts/doctor/${id}/`, data);
}

export function useUpdateDoctor() {
	const t = useTranslations();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateDoctor,
		onSuccess: () => {
			notifySuccess({
				title: "Doctor was updated successfully",
			});
			queryClient.invalidateQueries({
				queryKey: ["deleted-doctors"],
			});
			queryClient.invalidateQueries({
				queryKey: ["doctors"],
			});
		},
		onError: (e) => {
			const message = getErrorMessageSync(e, t);
			notifyError({
				title: "Couldn't update the doctor",
				message,
			});
		},
	});
}

// -------- DELETE

export async function deleteDoctor(
	id: string,
	method: "soft" | "hard" = "soft",
) {
	return await http.delete(`/accounts/doctor/${id}/`, {
		params: {
			method,
		},
	});
}

export function useDeleteDoctor() {
	const t = useTranslations();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteDoctor,
		onSuccess: () => {
			notifySuccess({
				title: "Doctor was deleted successfully",
			});
			queryClient.invalidateQueries({
				queryKey: ["deleted-doctors"],
			});
			queryClient.invalidateQueries({
				queryKey: ["doctors"],
			});
		},
		onError: (e) => {
			const message = getErrorMessageSync(e, t);
			notifyError({
				title: "Couldn't delete the doctor",
				message,
			});
		},
	});
}

export async function restoreDoctor(id: string) {
	return await http.post(`/accounts/deleted-doctor/restore/${id}/`);
}

export function useRestoreDoctor() {
	const t = useTranslations();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: restoreDoctor,
		onSuccess: () => {
			notifySuccess({
				title: "Doctor was restored successfully",
			});
			queryClient.invalidateQueries({
				queryKey: ["deleted-doctors"],
			});
			queryClient.invalidateQueries({
				queryKey: ["doctors"],
			});
		},
		onError: (e) => {
			const message = getErrorMessageSync(e, t);
			notifyError({
				title: "Couldn't restore the doctor",
				message,
			});
		},
	});
}
