import DetailsCard from "@/components/site/details-card";
import useVisitsTable from "@/hooks/datagrids/visits";
import { Box, Button, Group, Title } from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";
import { useFormatter } from "next-intl";

export default function PatientDetails({ patientId }: { patientId: string }) {
	const formatter = useFormatter();
	const visitsTable = useVisitsTable();
	const currentlyInAVisit = true;
	return (
		<>
			<Box mt="md">
				<DetailsCard
					details={[
						{ title: "Name", value: `Patient ${patientId}` },
						{ title: "Date of birth", value: formatter.dateTime(new Date()) },
						{ title: "Age", value: 22 },
						{ title: "Gender", value: "Male" },
						{ title: "Address", value: "Lore ipsum, asdio weiorjk" },
						{ title: "Phone number", value: "+20100000000000" },
						{ title: "Patient code", value: "23R849WE2" },
						{ title: "National ID", value: "2394872398273498273" },
					]}
				/>
			</Box>
			<Box mt="xl">
				<Title component={"h2"} mb="md">
					Visits
				</Title>
				<MantineReactTable table={visitsTable} />
			</Box>
			<Box mt="xl">
				<Group justify="space-between">
					<Title component={"h2"} mb="md">
						Doctors
					</Title>
					{currentlyInAVisit && <Button>Add doctor</Button>}
				</Group>
				<MantineReactTable table={visitsTable} />
			</Box>
		</>
	);
}
