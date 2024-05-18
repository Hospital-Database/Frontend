"use client";
import useURL from "@/hooks/use-url";
import type { PatientVerbose } from "@/lib/types";
import { Tabs } from "@mantine/core";
import {
	IconFileDescription,
	IconFiles,
	IconStethoscope,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import PatientDetails from "./patient-details";
import PatientDocuments from "./patient-documents";
import PatientMeasurements from "./patient-measurements";

export default function PatientTabs({ patient }: { patient: PatientVerbose }) {
	const { setSearchParam, searchParams } = useURL();
	const t = useTranslations("Patient");
	return (
		<Tabs
			value={searchParams.get("tab") || "details"}
			onChange={(tab) => setSearchParam("tab", tab)}
		>
			<Tabs.List>
				<Tabs.Tab
					value="details"
					leftSection={<IconFileDescription className="w-5 h-5" />}
				>
					{t("details")}
				</Tabs.Tab>
				<Tabs.Tab
					value="measurements"
					leftSection={<IconStethoscope className="w-5 h-5" />}
				>
					{t("measurements")}
				</Tabs.Tab>
				<Tabs.Tab
					value="documents"
					leftSection={<IconFiles className="w-5 h-5" />}
				>
					{t("documents")}
				</Tabs.Tab>
			</Tabs.List>
			<Tabs.Panel value="details">
				<PatientDetails patient={patient} />
			</Tabs.Panel>
			<Tabs.Panel value="measurements">
				<PatientMeasurements patient={patient} />
			</Tabs.Panel>
			<Tabs.Panel value="documents">
				<PatientDocuments patient={patient} />
			</Tabs.Panel>
		</Tabs>
	);
}
