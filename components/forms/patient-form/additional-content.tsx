"use client";

import type { patientSchema } from "@/api/patients";
import AddressField from "@/components/address-field/address-field";
import { Group, Radio, Select, TextInput, Textarea } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import type { UseFormReturnType } from "@mantine/form";
import { useTranslations } from "next-intl";
import type { z } from "zod";

export default function AdditionalContent({
	form,
}: {
	form: UseFormReturnType<z.infer<typeof patientSchema>>;
}) {
	const t = useTranslations("Forms");
	return (
		<main className="space-y-5">
			<TextInput
				{...form.getInputProps("phone.mobile")}
				label={t("phone-number")}
			/>
			<Radio.Group
				label={t("gender")}
				{...form.getInputProps("gender")}
				key={form.key("gender")}
			>
				<Group>
					<Radio value="male" label={t("male")} />
					<Radio value="female" label={t("female")} />
				</Group>
			</Radio.Group>
			<Select
				{...form.getInputProps("martial_status")}
				label={t("material-status")}
				placeholder={t("choose-your-material-status")}
				data={[t("maried"), t("single"), t("divorsed"), t("widowed")]}
			/>
			<AddressField form={form} />
			<DatePickerInput
				label={t("date-of-birth")}
				placeholder={t("date-input")}
				{...form.getInputProps("date_of_birth")}
			/>
			<Textarea
				label={t("notes")}
				resize="vertical"
				placeholder={t("enter-some-notes-here")}
				{...form.getInputProps("notes")}
				key={form.key("notes")}
			/>
		</main>
	);
}
