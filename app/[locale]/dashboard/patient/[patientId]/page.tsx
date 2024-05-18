"use client";

import { useDeletePatient, usePatient } from "@/api/patients";
import { useRouter } from "@/navigation";
import { Routes } from "@/routes/routes";
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
import { useTranslations } from "next-intl";
import PatientImage from "./_components/patient-image";
import PatientTabs from "./_components/patient-tabs";
import VisitDetails from "./_components/visit-details";

export default function PatientPage({
	params: { patientId },
}: { params: { patientId: string } }) {
	const t = useTranslations("Patient");
	const query = usePatient(patientId);
	if (query.isLoading)
		return (
			<Group justify="center">
				<Loader />
			</Group>
		);
	const patient = query.data;
	if (query.isError || !patient)
		return <div>{t("error-fetching-the-patient")}</div>;
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
							<Anchor href={"/dashboard"}>{t("dashboard")}</Anchor>
							<Anchor href={"/dashboard/patients"}>{t("patients")}</Anchor>
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
	const t = useTranslations("Patient");
	return <Button>{t("start-visit")}</Button>;
}

function OtherActions({ patientId }: { patientId: string }) {
	const router = useRouter();
	const { mutate } = useDeletePatient(() => {
		router.push("/dashboard/patients");
	});
	const t = useTranslations("Patient");
	return (
		<Menu>
			<Menu.Target>
				<ActionIcon size={"lg"} variant="default">
					<IconDots size={20} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item
					onClick={() => router.push(Routes.editPatient({ patientId }))}
				>
					{t("edit")}
				</Menu.Item>
				<Menu.Item
					color="red"
					onClick={() => {
						mutate(patientId);
					}}
				>
					{t("delete")}
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
