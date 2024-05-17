import { type doctorSchema, getDoctors } from "@/api/doctors";
import type { UseFormReturnType } from "@mantine/form";
import { debounce } from "lodash";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";
import type { z } from "zod";

export default function useCheckDoctorNationalId(
	form: UseFormReturnType<z.infer<typeof doctorSchema>>,
	initialValue?: string,
) {
	const t = useTranslations("Forms");

	// biome-ignore lint/correctness/useExhaustiveDependencies: it is a bug in Biome
	const checkNationalId = useCallback(
		debounce(async (national_id: string) => {
			if (initialValue && initialValue === national_id) return;
			if (typeof national_id !== "string" || national_id.length !== 14) {
				form.setFieldError("national_id", t("national-id-must-be-14-digits"));
				return;
			}
			const { results } = await getDoctors({
				columnFilters: [
					{
						id: "national_id",
						value: national_id,
					},
				],
			});
			if (results.length === 1) {
				form.setFieldError("national_id", t("user-is-already-exist"));
			} else {
				form.setFieldError("national_id", null);
			}
		}, 1000),
		[initialValue, form.setFieldError],
	);

	const nationalId = form.getValues().national_id;
	useEffect(() => {
		checkNationalId(nationalId);
	}, [nationalId, checkNationalId]);
}
