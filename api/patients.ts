"use client";
import type { FetchOptions } from "@/hooks/use-our-table";
import { http } from "@/lib/axios";
import { getErrorMessageSync } from "@/lib/err-msg";
import getTableSearchParams from "@/lib/get-search-params";
import { notifyError, notifySuccess } from "@/lib/notifications";
import type { Patient, PatientVerbose } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useTranslations } from "next-intl";
import * as z from "zod";
import { imageSchema } from "./common";
import { createUserImage, updateUserImage } from "./users";

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
		city: z.preprocess((val) => val || undefined, z.string().optional()),
		governorate: z.preprocess((val) => val || undefined, z.string().optional()),
		street: z.preprocess((val) => val || undefined, z.string().optional()),
	}),
	martial_status: z.preprocess(
		(val) => val || undefined,
		z.string().optional(),
	),
	date_of_birth: z.date().optional(),
	notes: z.preprocess((val) => val || undefined, z.string().min(3).optional()),
});

// -------- CREATE

export async function createPatient({
	image,
	...data
}: Omit<z.infer<typeof patientSchema>, "date_of_birth"> & {
	date_of_birth?: string;
}) {
	const response = await http.post<Patient>("/accounts/patient/", data);
	try {
		if (image)
			await createUserImage({ image: image, user: response.data.user });
	} catch {}
	return response;
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
		.get<PatientVerbose>(`/accounts/patient/${id}/`)
		.then((res) => res.data);
}

export async function getPatientByNationalId(nationalId: string) {
	const { results } = await getPatients({
		pagination: {
			pageIndex: 0,
			pageSize: 1,
		},
		columnFilters: [
			{
				id: "national_id",
				value: nationalId,
			},
		],
	});
	return results[0];
}

export async function getDeletedPatients(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return await http
		.get<{ count: number; results: Patient[] }>("/accounts/patient/deleted/", {
			params,
		})
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

// -------- UPDATE

export async function updatePatient({
	prevData: { id, image: prevImage },
	newData: { image, ...data },
}: {
	prevData: Patient;
	newData: Omit<z.infer<typeof patientSchema>, "date_of_birth"> & {
		date_of_birth?: string;
	};
}) {
	const response = await http.patch<Patient>(`/accounts/patient/${id}/`, data);
	try {
		if (image) {
			if (prevImage)
				await updateUserImage(prevImage.id, {
					image: image,
					user: response.data.user,
				});
			else await createUserImage({ image: image, user: response.data.user });
		}
	} catch {}
	return response;
}

export function useUpdatePatient({
	onSuccess,
}: {
	onSuccess?: (response: AxiosResponse<Patient>) => void;
} = {}) {
	const t = useTranslations();
	return useMutation({
		mutationFn: updatePatient,
		onSuccess: (response) => {
			notifySuccess({
				title: "Patient was updated successfully",
			});
			onSuccess?.(response);
		},
		onError: (e) => {
			const message = getErrorMessageSync(e, t);
			notifyError({
				title: "Couldn't update the patient",
				message,
			});
		},
	});
}

// -------- DELETE

export async function deletePatient(id: string) {
	return await http.delete(`/accounts/patient/${id}`);
}

export function useDeletePatient(
	onSuccess?: (response: AxiosResponse<Patient>) => void,
) {
	return useMutation({
		mutationFn: deletePatient,
		onSuccess: (response) => {
			notifySuccess({
				title: "Patient was deleted successfully",
			});
			onSuccess?.(response);
		},
		onError: () => {
			notifyError({
				title: "patient can't deleted",
			});
		},
	});
}
