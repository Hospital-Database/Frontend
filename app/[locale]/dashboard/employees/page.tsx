"use client";
import EmployeesCRUDTable from "@/components/datagrids/employees/employees-crud";
import { Anchor, Box, Breadcrumbs, Title } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function EmployeesPage() {
	const t = useTranslations("Employees");
	return (
		<Box>
			<Title component={"h1"} mb="md" mt="xl">
				{t("employees")}
			</Title>
			<Breadcrumbs mb="xl">
				<Anchor href={"/dashboard"}>{t("dashboard")}</Anchor>
				<span>{t("employees")}</span>
			</Breadcrumbs>
			<EmployeesCRUDTable />
		</Box>
	);
}
