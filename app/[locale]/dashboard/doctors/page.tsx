"use client";
import DoctorsCRUDTable from "@/components/datagrids/doctors/doctors-crud";
import { Anchor, Box, Breadcrumbs, Title } from "@mantine/core";

export default function DoctorsPage() {
	return (
		<Box>
			<Title component={"h1"} mb="md" mt="xl">
				Doctors
			</Title>
			<Breadcrumbs mb="xl">
				<Anchor href={"/dashboard"}>Dashboard</Anchor>
				<span>Doctors</span>
			</Breadcrumbs>
			<DoctorsCRUDTable />
		</Box>
	);
}
