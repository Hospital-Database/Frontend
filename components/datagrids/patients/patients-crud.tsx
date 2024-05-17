"use client";
import { SegmentedControl } from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";
import { useState } from "react";
import usePatientsTable from "./use-patients-table";

export default function PatientsCRUDTable() {
	const [tab, setTab] = useState<"deleted" | "current">("current");
	const patientsTable = usePatientsTable({
		deleted: tab === "deleted",
	});
	return (
		<div>
			<SegmentedControl
				mb="md"
				radius="xl"
				data={[
					{ value: "current", label: "Current" },
					{
						value: "deleted",
						label: "Deleted",
					},
				]}
				onChange={(val) => {
					setTab(val as "deleted" | "current");
				}}
			/>
			<MantineReactTable table={patientsTable} />
		</div>
	);
}
