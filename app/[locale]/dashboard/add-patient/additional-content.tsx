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
import { useLocale } from "next-intl";
import { useState } from "react";
import { EgyptCities, type EgyptCitiesKey, EgyptGovernment } from "./form-data";

export default function AdditionalContent({
	form,
}: {
	form: UseFormReturnType<
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		Record<string, any>,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(values: Record<string, any>) => Record<string, any>
	>;
}) {
	return (
		<main className="space-y-5">
			<div>
				<Text>Phone Number</Text>
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
				label="Gender"
				{...form.getInputProps("gender")}
				key={form.key("gender")}
			>
				<Group>
					<Radio value="male" label="Male" />
					<Radio value="female" label="Female" />
				</Group>
			</Radio.Group>

			<Select
				label="Material status"
				placeholder="Choose your material Status"
				data={["Finished", "Single"]}
				{...form.getInputProps("martialStatus")}
				key={form.key("martialStatus")}
			/>
			<Address form={form} />

			<DatePickerInput
				label="Date of Birth"
				placeholder="Date input"
				{...form.getInputProps("dateOfBirth")}
				key={form.key("dateOfBirth")}
			/>

			<Textarea
				label="Notes"
				resize="vertical"
				placeholder="Enter some notes here"
				{...form.getInputProps("notes")}
				key={form.key("notes")}
			/>
		</main>
	);
}
function Address({
	form,
}: {
	form: UseFormReturnType<
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		Record<string, any>,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(values: Record<string, any>) => Record<string, any>
	>;
}) {
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
			<label>Address</label>
			<div className="grid grid-cols-3 gap-x-2">
				<div className="flex items-center gap-x-2">
					<Select
						placeholder="Government"
						data={EgyptGovernment[locale]}
						{...form.getInputProps("government")}
						key={form.key("government")}
						value={government}
						onChange={handleGovernmentChange}
						searchable
						nothingFoundMessage="Nothing found..."
						className="grow"
					/>
					<span className="text-2xl">/ </span>
				</div>
				<div className="flex items-center gap-x-2">
					<Select
						placeholder="Status"
						//@ts-ignore
						data={status ? EgyptCities[status][locale] : ""}
						{...form.getInputProps("status")}
						key={form.key("status")}
						searchable
						nothingFoundMessage="Nothing found..."
						className="grow"
					/>
					<span className="text-2xl">/ </span>
				</div>
				<div className="flex gap-x-2">
					<TextInput
						placeholder="street"
						{...form.getInputProps("street")}
						key={form.key("street")}
						className="grow"
					/>
				</div>
			</div>
		</section>
	);
}
