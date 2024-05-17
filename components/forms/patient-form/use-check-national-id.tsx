import { getPatients, type patientSchema } from "@/api/patients";
import { Link } from "@/navigation";
import { Button, Group, Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { debounce } from "lodash";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";
import type { z } from "zod";

export default function useCheckPatientNationalId(
	form: UseFormReturnType<z.infer<typeof patientSchema>>,
	initialValue?: string,
) {
	const t = useTranslations("Forms");
	const checkNationalId = useCallback(
		debounce(async (national_id: string) => {
			if (initialValue && initialValue === national_id) return;
			if (typeof national_id !== "string" || national_id.length > 14) {
				form.setFieldError("national_id", t("national-id-must-be-14-digits"));
				return;
				// biome-ignore lint/style/noUselessElse: <explanation>
			} else if (national_id.length < 14) {
				form.setFieldError("national_id", t("national-id-at-least-14-digits"));
				return;
			}

			const { results } = await getPatients({
				columnFilters: [
					{
						id: "national_id",
						value: national_id,
					},
				],
			});
			if (results.length === 1) {
				form.setFieldError(
					"national_id",
					<Group gap="md">
						<Text>{t("user-is-already-exist")}</Text>
						<Link href={`/dashboard/patient/${results[0].id}`}>
							<Button variant="light" type="button">
								{t("see-details")}
							</Button>
						</Link>
					</Group>,
				);
			} else {
				form.setFieldError("national_id", null);
			}
		}, 1000),
		[],
	);

	const nationalId = form.getValues().national_id;
	useEffect(() => {
		checkNationalId(nationalId);
	}, [nationalId, checkNationalId]);
}
