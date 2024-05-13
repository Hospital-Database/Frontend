import type { FetchOptions } from "@/hooks/datagrids/use-datagrid";
import { http } from "@/lib/axios";
import getTableSearchParams from "@/lib/get-search-params";
import { notifyError, notifySuccess } from "@/lib/notifications";
import type { Patient } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { type AxiosResponse, isAxiosError } from "axios";
import * as z from "zod";
import { imageSchema } from "./common";

export const createPatientSchema = z.object({
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

export async function createPatient(data: z.infer<typeof createPatientSchema>) {
	return await http.post<Patient>("/accounts/patient/", data);
}

export function useCreatePatient({
	onSuccess,
}: {
	onSuccess?: (response: AxiosResponse<Patient>) => void;
} = {}) {
	return useMutation({
		mutationFn: createPatient,
		onSuccess: (response) => {
			notifySuccess({
				title: "Patient was added successfully",
				message: "",
			});
			onSuccess?.(response);
		},
		onError: (e) => {
			let error = "something went wrong";
			if (isAxiosError(e)) error = e?.response?.data;
			notifyError({
				title: typeof error === "string" ? error : "Something went wrong",
				message: "",
			});
		},
	});
}

export async function getPatients(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return await http
		.get<{ count: number; results: Patient[] }>("/accounts/patient/", {
			params,
		})
		.then(({ data }) => data);
}

export function usePatients(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return useQuery({
		queryKey: ["patients", params.toString()],
		queryFn: () => getPatients(options),
	});
}
