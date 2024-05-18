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
	height: z.string(),
	weight: z.string(),
	blood_pressure: z.string(),
	temperature: z.string(),
	pulse: z.string(),
	oxygen_level: z.string(),
});

export const visitSchema = z.object({
	measurement: measurementSchema,
	status: z.string(),
	visit_number: z.string(),
	ticket: z.string(),
	notes: z.string(),
	patient: z.number().positive().int().optional(),
});

// -------- CREATE
export async function createVisit(data: z.infer<typeof visitSchema>) {
	return await http.post("/visit/visit/", data);
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

// -------- DELETE
