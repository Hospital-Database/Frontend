import DetailsCard from "@/components/details-card";
import { DoctorsTable } from "@/components/table/doctors/doctors";
import { VisitsTable } from "@/components/table/visits/visits";
import type { PatientVerbose } from "@/lib/types";
import { formatAddress } from "@/lib/utils";
import { Box, Title } from "@mantine/core";
import { useFormatter } from "next-intl";

export default function PatientDetails({
	patient,
}: { patient: PatientVerbose }) {
	const formatter = useFormatter();
	const age = formatter.relativeTime(new Date(patient.date_of_birth), {
		unit: "year",
	});
	return (
		<>
			<Box mt="md">
				<Title component={"h2"} mb="md">
					Details
				</Title>
				<DetailsCard
					details={[
						{ title: "Name", value: patient.full_name },
						{ title: "National ID", value: patient.national_id },
						{
							title: "Date of birth",
							value: formatter.dateTime(new Date(patient.date_of_birth)),
						},
						{ title: "Age", value: age },
						{ title: "Gender", value: patient.gender },
						{ title: "Address", value: formatAddress(patient.address) },
						{ title: "Phone number", value: patient.phone?.mobile },
					]}
				/>
			</Box>
			<Box mt="xl">
				<Title component={"h2"} mb="md">
					Visits
				</Title>
				<VisitsTable />
			</Box>
			<Box mt="xl">
				<Title component={"h2"} mb="md">
					Doctors
				</Title>
				{/* TODO: display data */}
				<DoctorsTable data={patient.doctors} />
			</Box>
		</>
	);
}
