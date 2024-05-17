"use client";
import DoctorsCRUDTable from "@/components/datagrids/doctors/doctors-crud";
import { Anchor, Box, Breadcrumbs, Title } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function DoctorsPage() {
	const t = useTranslations("Doctors");
	return (
		<Box>
			<Title component={"h1"} mb="md" mt="xl">
				{t("doctors")}
			</Title>
			<Breadcrumbs mb="xl">
				<Anchor href={"/dashboard"}>{t("dashboard")}</Anchor>
				<span>{t("doctors")}</span>
			</Breadcrumbs>
			<DoctorsCRUDTable />
		</Box>
	);
}
