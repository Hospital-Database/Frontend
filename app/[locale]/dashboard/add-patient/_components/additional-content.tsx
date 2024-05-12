"use client";
import AddressField from "@/components/address-field/address-field";
import type { Patient } from "@/lib/types";
import { Group, Radio, Select, TextInput, Textarea } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import type { UseFormReturnType } from "@mantine/form";
import { useTranslations } from "next-intl";

export default function AdditionalContent({
	form,
}: {
	form: UseFormReturnType<Patient, (values: Patient) => Patient>;
}) {
	const t = useTranslations("AddPatient");
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
				data={[t("finished"), t("single")]}
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
