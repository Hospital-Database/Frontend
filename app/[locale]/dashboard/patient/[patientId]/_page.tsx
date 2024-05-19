"use client";

import { useDeletePatient } from "@/api/patients";
import {
	useCreateVisit,
	useUpdateVisit,
	useVisits,
	type visitSchema,
} from "@/api/visits";
import VisitForm from "@/components/forms/visits";
import { usePermissions } from "@/hooks/use-permissions";
import type { PatientVerbose, Visit } from "@/lib/types";
import { useRouter } from "@/navigation";
import { Routes } from "@/routes/routes";
import {
	ActionIcon,
	Anchor,
	Box,
	Breadcrumbs,
	Button,
	Group,
	Menu,
	Stack,
	Title,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { z } from "zod";
import PatientImage from "./_components/patient-image";
import PatientTabs from "./_components/patient-tabs";
import VisitDetails from "./_components/visit-details";

export default function PatientPage({ patient }: { patient: PatientVerbose }) {
	const t = useTranslations("Patient");
	const perms = usePermissions();
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
					{perms.visit.canCreateVisit() && (
						<ManageVisitButton patientId={patient.id} />
					)}
					<OtherActions patientId={patient.id} />
				</Group>
			</Group>
			<Box mt="md" mb="xl">
				<VisitDetails patientId={patient.id} />
			</Box>
			<Box mt="xl">
				<PatientTabs patient={patient} />
			</Box>
		</>
	);
}

function ManageVisitButton({ patientId }: { patientId: string }) {
	const [formState, setFormState] = useState<"update" | "create">();
	const [initialValues, setInitialValues] = useState<Visit>();
	const t = useTranslations("Patient");
	const createVisit = useCreateVisit();
	const updateVisit = useUpdateVisit();

	const { data } = useVisits({
		columnFilters: [{ id: "patient", value: patientId }],
	});
	const visitData =
		data?.results?.filter((item) => item.status === "pending") || [];
	useEffect(() => {
		setInitialValues(visitData?.[0]);
	}, [visitData]);

	return (
		<Box>
			<Button
				onClick={() => {
					if (visitData?.length > 0) setFormState("update");
					else setFormState("create");
				}}
			>
				{visitData?.length > 0 ? t("edit-visit") : t("start-visit")}
			</Button>
			<VisitForm
				//@ts-ignore explanation => there is not side effect if we didn't fix the type error
				onSubmit={(data) => {
					if (formState === "create")
						return createVisit.mutate({
							...data,
							patient: patientId,
						} as z.infer<typeof visitSchema>);
					return updateVisit.mutate({ ...data, patient: patientId } as Visit);
				}}
				opened={!!formState}
				onSuccess={() => setFormState(undefined)}
				onClose={() => setFormState(undefined)}
				initialValues={initialValues}
				formState={formState}
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
	const perms = usePermissions();
	return (
		<Menu>
			<Menu.Target>
				<ActionIcon size={"lg"} variant="default">
					<IconDots size={20} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item
					disabled={!perms.patient.canUpdatePatient()}
					onClick={() => router.push(Routes.editPatient({ patientId }))}
				>
					{t("edit")}
				</Menu.Item>
				<Menu.Item
					color="red"
					disabled={!perms.patient.canDeletePatient()}
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
