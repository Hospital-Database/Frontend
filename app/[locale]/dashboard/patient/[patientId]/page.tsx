"use client";

import { useDeletePatient, usePatient } from "@/api/patients";
import { useCreateVisit, type visitSchema } from "@/api/visits";
import VisitForm from "@/components/forms/visits";
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
import { useState } from "react";
import type { z } from "zod";
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
					<ManageVisitButton patientId={patientId} />
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

function ManageVisitButton({ patientId }: { patientId: string }) {
	const [formState, setFormState] = useState<"update" | "create">();
	const [initialValues, _setInitialValues] =
		useState<z.infer<typeof visitSchema>>();
	const t = useTranslations("Patient");
	const { mutate } = useCreateVisit();
	return (
		<Box>
			<Button onClick={() => setFormState("create")}>{t("start-visit")}</Button>
			<VisitForm
				onSubmit={(data) => {
					if (formState === "create")
						return mutate({ ...data, patient: patientId });
				}}
				opened={!!formState}
				onSuccess={() => setFormState(undefined)}
				onClose={() => setFormState(undefined)}
				initialValues={initialValues}
			/>
		</Box>
	);
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
