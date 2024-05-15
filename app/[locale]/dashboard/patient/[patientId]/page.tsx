"use client";

import { usePatient } from "@/api/patients";
import {
	Anchor,
	Box,
	Breadcrumbs,
	Button,
	Group,
	Loader,
	Stack,
	Title,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import PatientImage from "./_components/patient-image";
import PatientTabs from "./_components/patient-tabs";
import VisitDetails from "./_components/visit-details";

export default function PatientPage({
	params: { patientId },
}: { params: { patientId: string } }) {
	const query = usePatient(patientId);
	if (query.isLoading)
		return (
			<Group justify="center">
				<Loader />
			</Group>
		);
	const patient = query.data;
	if (query.isError || !patient) return <div>Error fetching the patient</div>;
	return (
		<>
			<Group mt="md" align="start" justify="space-between">
				<Group align="start">
					<div className="w-[100px] aspect-square bg-slate-200">
						<PatientImage patient={patient} />
					</div>
					<Stack>
						<Title component={"h1"}>Patient {patientId}</Title>
						<Breadcrumbs>
							<Anchor href={"/dashboard"}>Dashboard</Anchor>
							<Anchor href={"/dashboard/patients"}>Patients</Anchor>
							<span>Patients {patientId}</span>
						</Breadcrumbs>
					</Stack>
				</Group>
				<Group gap={"md"}>
					<ManageVisitButton />
					<OtherActions />
				</Group>
			</Group>
			{true && (
				<Box mt="md" mb="xl">
					<VisitDetails patientId={patientId} />
				</Box>
			)}
			<Box mt="xl">
				<PatientTabs patient={patient} />
			</Box>
		</>
	);
}

function ManageVisitButton() {
	return <Button>Start visit</Button>;
}

function OtherActions() {
	return (
		<Button variant="outline">
			<IconDots />
		</Button>
	);
}
