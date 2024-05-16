import type { FetchOptions } from "@/hooks/use-our-table";
import { http } from "@/lib/axios";
import { getErrorMessageSync } from "@/lib/err-msg";
import getTableSearchParams from "@/lib/get-search-params";
import { notifyError, notifySuccess } from "@/lib/notifications";
import type { Doctor } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const doctorSchema = z.object({
	full_name: z.string().min(2),
	national_id: z.string().regex(/^\d{14}$/, "National ID must be 14 digits"),
	gender: z.literal("female").or(z.literal("male")).optional(),
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

// -------- CREATE

export async function createDoctor(
	data: Omit<z.input<typeof doctorSchema>, "date_of_birth"> & {
		date_of_birth?: string;
	},
) {
	return await http.post<Doctor>("/accounts/doctor/", data);
}

export function useCreateDoctor({
	onSuccess,
}: {
	onSuccess?: (response: AxiosResponse<Doctor>) => void;
} = {}) {
	const t = useTranslations();
	return useMutation({
		mutationFn: createDoctor,
		onSuccess: (response) => {
			notifySuccess({
				title: "Doctor was added successfully",
			});
			onSuccess?.(response);
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

export function useUpdateDoctor({
	onSuccess,
}: {
	onSuccess?: (response: AxiosResponse<Doctor>) => void;
} = {}) {
	const t = useTranslations();
	return useMutation({
		mutationFn: updateDoctor,
		onSuccess: (response) => {
			notifySuccess({
				title: "Doctor was updated successfully",
			});
			onSuccess?.(response);
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
