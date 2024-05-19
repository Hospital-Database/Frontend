"use client";
import type { UseTableOptions } from "@/hooks/use-our-table";
import type { Patient } from "@/lib/types";
import { SegmentedControl } from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";
import { useTranslations } from "next-intl";
import { useState } from "react";
import usePatientsTable from "./use-patients-table";

export default function PatientsCRUDTable(options: UseTableOptions<Patient>) {
	const [tab, setTab] = useState<"deleted" | "current">("current");
	const t = useTranslations("Patient");
	const patientsTable = usePatientsTable({
		deleted: tab === "deleted",
		...options,
	});
	return (
		<div>
			<SegmentedControl
				mb="md"
				radius="xl"
				data={[
					{ value: "current", label: t("current") },
					{
						value: "deleted",
						label: t("deleted"),
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
