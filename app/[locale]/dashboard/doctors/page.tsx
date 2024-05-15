"use client";

import DoctorsDatagrid from "@/components/datagrids/doctors/doctors";
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
			<DoctorsDatagrid />
		</Box>
	);
}
