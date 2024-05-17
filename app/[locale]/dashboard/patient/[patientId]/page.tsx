"use client";

import { useDeletePatient, usePatient } from "@/api/patients";
import { useRouter } from "@/navigation";
import {
	ActionIcon,
	Anchor,
	Box,
	Breadcrumbs,
	Button,
	Group,
	Loader,
	Menu,
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
						<Title component={"h1"}>{patient.full_name}</Title>
						<Breadcrumbs>
							<Anchor href={"/dashboard"}>Dashboard</Anchor>
							<Anchor href={"/dashboard/patients"}>Patients</Anchor>
							<span>{patient.full_name}</span>
						</Breadcrumbs>
					</Stack>
				</Group>
				<Group gap={"md"}>
					<ManageVisitButton />
					<OtherActions patientId={patientId} />
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

function OtherActions({ patientId }: { patientId: string }) {
	const router = useRouter();
	const { mutate } = useDeletePatient(() => {
		router.push("/dashboard/patients");
	});
	return (
		<Menu>
			<Menu.Target>
				<ActionIcon size={"lg"} variant="default">
					<IconDots size={20} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item onClick={
					() => router.push(
						`/dashboard/patient/edit/${patientId}`)
				}>Edit</Menu.Item>
				<Menu.Item
					color="red"
					onClick={() => {
						mutate(patientId);
					}}
				>
					Delete
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
