"use client";

import PatientsCRUDTable from "@/components/datagrids/patients/patients-crud";
import type { Routes } from "@/routes/routes";
import { Anchor, Box, Breadcrumbs, Title } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function PatientsPage({
	searchParams,
}: { searchParams: typeof Routes.patients.search }) {
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
			<PatientsCRUDTable globalFilter={searchParams.q} />
		</Box>
	);
}
