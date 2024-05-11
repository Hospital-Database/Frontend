"use client";

import useAvatar from "@/hooks/use-avatar";
import {
	Anchor,
	Box,
	Breadcrumbs,
	Button,
	Group,
	Tabs,
	Title,
} from "@mantine/core";
import {
	IconDots,
	IconFileDescription,
	IconFiles,
	IconHeartbeat,
	IconStethoscope,
} from "@tabler/icons-react";
import Image from "next/image";
import PatientBiometrics from "./_components/patient-biometrics";
import PatientDetails from "./_components/patient-details";
import PatientDocuments from "./_components/patient-documents";
import PatientVitals from "./_components/patient-vitals";
import VisitDetails from "./_components/visit-details";
import useURL from "@/hooks/use-url";

export default function PatientPage({
	params: { patientId },
}: { params: { patientId: string } }) {
	const { setSearchParam, searchParams } = useURL();
	const avatar = useAvatar(undefined, { seed: patientId, size: 100 });

	return (
		<>
			<Breadcrumbs>
				<Anchor href={"/dashboard"}>Dashboard</Anchor>
				<Anchor href={"/dashboard/patients"}>Patients</Anchor>
				<span>Patients {patientId}</span>
			</Breadcrumbs>
			<Group mt="md" align="start" justify="space-between">
				<Group align="start">
					<div className="w-[100px] aspect-square bg-slate-200">
						<Image
							src={avatar}
							alt={"patient avatar"}
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</div>
					<Title component={"h1"}>Patient {patientId}</Title>
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
				<Tabs
					value={searchParams.get("tab")}
					onChange={(tab) => setSearchParam("tab", tab)}
				>
					<Tabs.List>
						<Tabs.Tab
							value="details"
							leftSection={<IconFileDescription className="w-5 h-5" />}
						>
							Details
						</Tabs.Tab>
						<Tabs.Tab
							value="vitals"
							leftSection={<IconStethoscope className="w-5 h-5" />}
						>
							Vitals
						</Tabs.Tab>
						<Tabs.Tab
							value="biometrics"
							leftSection={<IconHeartbeat className="w-5 h-5" />}
						>
							Biometrics
						</Tabs.Tab>
						<Tabs.Tab
							value="documents"
							leftSection={<IconFiles className="w-5 h-5" />}
						>
							Documents
						</Tabs.Tab>
					</Tabs.List>
					<Tabs.Panel value="details">
						<PatientDetails patientId={patientId} />
					</Tabs.Panel>
					<Tabs.Panel value="vitals">
						<PatientVitals patientId={patientId} />
					</Tabs.Panel>
					<Tabs.Panel value="biometrics">
						<PatientBiometrics patientId={patientId} />
					</Tabs.Panel>
					<Tabs.Panel value="documents">
						<PatientDocuments patientId={patientId} />
					</Tabs.Panel>
				</Tabs>
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
