"use client";
import {
	Box,
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
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function AdditionalContent({
	form,
}: {
	form: UseFormReturnType<
		Record<string, any>,
		(values: Record<string, any>) => Record<string, any>
	>;
}) {
	return (
		<Box className="space-y-3">
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
			<Grid>
				<Select
					label="Material status"
					placeholder="Choose your material Status"
					data={["Finished", "Single"]}
					{...form.getInputProps("martialStatus")}
					key={form.key("martialStatus")}
				/>
				<Grid.Col></Grid.Col>
			</Grid>

			<DatePickerInput label="Date input" placeholder="Date input" />

			<Textarea
				label="Notes"
				resize="vertical"
				placeholder="Enter some notes here"
				{...form.getInputProps("notes")}
				key={form.key("notes")}
			/>
		</Box>
	);
}
