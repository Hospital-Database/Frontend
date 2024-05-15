"use client";
import PatientsDatagrid from "@/components/datagrids/patients/patients";
import { Anchor, Box, Breadcrumbs, Title } from "@mantine/core";

export default function PatientsPage() {
	return (
		<Box>
			<Title component={"h1"} mb="md" mt="xl">
				Patients
			</Title>
			<Breadcrumbs mb="xl">
				<Anchor href={"/dashboard"}>Dashboard</Anchor>
				<span>Patients</span>
			</Breadcrumbs>
			<PatientsDatagrid />
		</Box>
	);
}
