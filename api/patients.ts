import type { FetchOptions } from "@/hooks/use-our-table";
import { http } from "@/lib/axios";
import { getErrorMessageSync } from "@/lib/err-msg";
import getTableSearchParams from "@/lib/get-search-params";
import { notifyError, notifySuccess } from "@/lib/notifications";
import type { Patient } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useTranslations } from "next-intl";
import * as z from "zod";
import { imageSchema } from "./common";

export const patientSchema = z.object({
	national_id: z.string().min(14).max(14),
	full_name: z.string().min(3),
	image: imageSchema.optional(),
	phone: z.object({
		mobile: z.preprocess(
			(val) => val || undefined,
			z.string().min(3).optional(),
		),
	}),
	gender: z.literal("male").or(z.literal("female")).optional(),
	address: z.object({
		city: z.string().optional(),
		governorate: z.string().optional(),
		street: z.string().optional(),
	}),
	martial_status: z.string().optional(),
	date_of_birth: z.date().optional(),
	notes: z.preprocess((val) => val || undefined, z.string().min(3).optional()),
});

// -------- CREATE

export async function createPatient(
	data: Omit<z.infer<typeof patientSchema>, "date_of_birth"> & {
		date_of_birth?: string;
	},
) {
	return await http.post<Patient>("/accounts/patient/", data);
}

export function useCreatePatient({
	onSuccess,
}: {
	onSuccess?: (response: AxiosResponse<Patient>) => void;
} = {}) {
	const t = useTranslations();
	return useMutation({
		mutationFn: createPatient,
		onSuccess: (response) => {
			notifySuccess({
				title: "Patient was added successfully",
			});
			onSuccess?.(response);
		},
		onError: (e) => {
			const message = getErrorMessageSync(e, t);
			notifyError({
				title: "Couldn't create the patient",
				message,
			});
		},
	});
}

// -------- READ

export async function getPatients(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return await http
		.get<{ count: number; results: Patient[] }>("/accounts/patient/", {
			params,
		})
		.then(({ data }) => data);
}

export async function getPatient(id: string | number) {
	return await http
		.get<Patient>(`/accounts/patient/${id}/`)
		.then((res) => res.data);
}

export function usePatients(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return useQuery({
		queryKey: ["patients", params.toString()],
		queryFn: () => getPatients(options),
	});
}

export function usePatient(id: string | number) {
	return useQuery({
		queryKey: ["patient", id],
		queryFn: () => getPatient(id),
	});
}
