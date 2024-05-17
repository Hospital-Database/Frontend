"use client";

import PatientsCRUDTable from "@/components/datagrids/patients/patients-crud";
import { Anchor, Box, Breadcrumbs, Title } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function PatientsPage() {
	const t = useTranslations("Patients");
	return (
		<Box>
			<Title component={"h1"} mb="md" mt="xl">
				{t("patients")}
			</Title>
			<Breadcrumbs mb="xl">
				<Anchor href={"/dashboard"}>{t("dashboard")}</Anchor>
				<span>{t("patients")}</span>
			</Breadcrumbs>
			<PatientsCRUDTable />
		</Box>
	);
}
