import type { FetchOptions } from "@/hooks/use-our-table";
import { http } from "@/lib/axios";
import getTableSearchParams from "@/lib/get-search-params";
import { notifyError, notifySuccess } from "@/lib/notifications";
import type { Visit } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { z } from "zod";

// -------- SCHEMA
const measurementSchema = z.object({
	height: z.coerce.number().optional(),
	weight: z.coerce.number().optional(),
	blood_pressure: z.coerce.number().optional(),
	temperature: z.coerce.number().optional(),
	pulse: z.coerce.number().optional(),
	oxygen_level: z.coerce.number().optional(),
});

export const visitSchema = z.object({
	measurement: measurementSchema,
	visit_number: z.coerce.number(),
	ticket: z.coerce.number(),
	status: z.string(),
	notes: z.string().optional(),
	patient: z.string().optional(),
});

// -------- CREATE
export async function createVisit(data: z.infer<typeof visitSchema>) {
	return await http.post("/visit/visit/", { ...data, start_at: new Date() });
}
export function useCreateVisit() {
	const t = useTranslations("Visits");
	return useMutation({
		mutationFn: createVisit,
		onSuccess: () => {
			notifySuccess({ title: t("visit-is-created") });
		},
		onError: () => {
			notifyError({ title: t("can-not-create-visit") });
		},
	});
}

// -------- READ

export async function getVisits(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return await http
		.get<{ count: number; results: Visit[] }>("/visit/visit/", {
			params,
		})
		.then((res) => res.data);
}

export function useVisits(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return useQuery({
		queryKey: ["visits", params.toString()],
		queryFn: () => getVisits(options),
	});
}

// -------- UPDATE
export async function updateVisit(data: Visit) {
	return await http.put(`/visit/visit/${data.id}/`, data);
}

export function useUpdateVisit() {
	const t = useTranslations("Visits");
	return useMutation({
		mutationFn: updateVisit,
		onSuccess: () => {
			notifySuccess({ title: t("visit-is-updated") });
		},
		onError: () => {
			notifyError({ title: t("can-not-update-visit") });
		},
	});
}

// -------- DELETE
export async function deleteVisit(options: { id: string; ticket: number }) {
	return http.delete(`/visit/visit/${options.id}`);
}

export function useDeleteVisit() {
	return useMutation({
		mutationFn: deleteVisit,
		onSuccess: () => {
			notifySuccess({ title: "Visit is delete Successfully" });
		},
		onError: () => {
			notifyError({ title: "Visit can't delete" });
		},
	});
}
