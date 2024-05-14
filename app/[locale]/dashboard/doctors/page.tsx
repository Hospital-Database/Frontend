"use client";

import DoctorsDatagrid from "@/components/datagrids/doctors/doctors";
import { Anchor, Box, Breadcrumbs } from "@mantine/core";

export default function DoctorsPage() {
	return (
		<Box>
			<Breadcrumbs mb="xl">
				<Anchor href={"/dashboard"}>Dashboard</Anchor>
				<span>Doctors</span>
			</Breadcrumbs>
			<DoctorsDatagrid />
		</Box>
	);
}
