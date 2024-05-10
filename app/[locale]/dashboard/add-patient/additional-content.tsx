"use client";
import {
	type ComboboxItem,
	Grid,
	Group,
	Radio,
	Select,
	Text,
	TextInput,
	Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import type { UseFormReturnType } from "@mantine/form";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import type { Patient } from "../../types/patient";
import { EgyptCities, type EgyptCitiesKey, EgyptGovernment } from "./form-data";

export default function AdditionalContent({
	form,
}: {
	form: UseFormReturnType<Patient, (values: Patient) => Patient>;
}) {
	const t = useTranslations("AddPatient");
	return (
		<main className="space-y-5">
			<div>
				<Text>{t("phone-number")}</Text>
				<Grid>
					<Grid.Col span={2}>
						<Select defaultValue="+2" data={["+2"]} />
					</Grid.Col>
					<Grid.Col span={10}>
						<TextInput
							name="phoneNumber"
							{...form.getInputProps("phoneNumber")}
							key={form.key("phoneNumber")}
						/>
					</Grid.Col>
				</Grid>
			</div>

			<Radio.Group
				name="gender"
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
				label={t("material-status")}
				placeholder={t("choose-your-material-status")}
				data={[t("finished"), t("single")]}
				{...form.getInputProps("martialStatus")}
				key={form.key("martialStatus")}
			/>
			<Address form={form} />

			<DatePickerInput
				label={t("date-of-birth")}
				placeholder={t("date-input")}
				{...form.getInputProps("dateOfBirth")}
				key={form.key("dateOfBirth")}
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
function Address({
	form,
}: {
	form: UseFormReturnType<Patient>;
}) {
	const t = useTranslations("AddPatient");
	const locale = useLocale() as "ar" | "en";
	const [government, setGovernment] = useState<string | null>(null);
	const [status, setStatus] = useState<EgyptCitiesKey | null>(null);
	const handleGovernmentChange = (
		value: string | null,
		_option: ComboboxItem,
	) => {
		if (!value) return;
		const index = EgyptGovernment[locale].findIndex((item) => item === value);
		setStatus(EgyptGovernment.en[index] as EgyptCitiesKey);
		setGovernment(value);
		form.getInputProps("government").onChange(value);
	};
	return (
		<section>
			<label>{t("address")}</label>
			<div className="grid grid-cols-3 gap-x-2">
				<div className="flex items-center gap-x-2">
					<Select
						placeholder={t("government")}
						data={EgyptGovernment[locale]}
						{...form.getInputProps("government")}
						key={form.key("government")}
						value={government}
						onChange={handleGovernmentChange}
						searchable
						nothingFoundMessage={t("nothing-found")}
						className="grow"
					/>
					<span className="text-2xl">/ </span>
				</div>
				<div className="flex items-center gap-x-2">
					<Select
						placeholder={t("status")}
						//@ts-ignore
						data={status ? EgyptCities[status][locale] : ""}
						{...form.getInputProps("status")}
						key={form.key("status")}
						searchable
						nothingFoundMessage={t("nothing-found")}
						className="grow"
					/>
					<span className="text-2xl">/ </span>
				</div>
				<div className="flex gap-x-2">
					<TextInput
						placeholder={t("street")}
						{...form.getInputProps("street")}
						key={form.key("street")}
						className="grow"
					/>
				</div>
			</div>
		</section>
	);
}
