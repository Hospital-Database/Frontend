import { DoctorsTable } from "@/components/datagrids/doctors/doctors";
import { VisitsTable } from "@/components/datagrids/visits/visits";
import DetailsCard from "@/components/details-card";
import type { PatientVerbose } from "@/lib/types";
import { formatAddress } from "@/lib/utils";
import { Box, Title } from "@mantine/core";
import { useFormatter } from "next-intl";
import { useTranslations } from "next-intl";

export default function PatientDetails({
	patient,
}: { patient: PatientVerbose }) {
	const formatter = useFormatter();
	const age = formatter.relativeTime(new Date(patient.date_of_birth), {
		unit: "year",
	});
	const t = useTranslations("Patient");
	return (
		<>
			<Box mt="md">
				<Title component={"h2"} mb="md">
					{t("details")}
				</Title>
				<DetailsCard
					details={[
						{ title: t("name"), value: patient.full_name },
						{ title: t("national-id"), value: patient.national_id },
						{
							title: t("date-of-birth"),
							value: formatter.dateTime(new Date(patient.date_of_birth)),
						},
						{ title: t("age"), value: age },
						{ title: t("gender"), value: patient.gender },
						{ title: t("address"), value: formatAddress(patient.address) },
						{ title: t("phone-number"), value: patient.phone?.mobile },
					]}
				/>
			</Box>
			<Box mt="xl">
				<Title component={"h2"} mb="md">
					{t("visits")}
				</Title>
				<VisitsTable />
			</Box>
			<Box mt="xl">
				<Title component={"h2"} mb="md">
					{t("doctors")}
				</Title>
				{/* TODO: display data */}
				<DoctorsTable data={patient.doctors} />
			</Box>
		</>
	);
}
