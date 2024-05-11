import "@mantine/dropzone/styles.css";

import { Box, Group, Stack, TextInput, Title } from "@mantine/core";
import { FilesDropzone } from "./files-dropzone";
import FileCard from "./file-card";
import { IconSearch } from "@tabler/icons-react";

export default function PatientDocuments({
	patientId: _,
}: { patientId: string }) {
	return (
		<Box mt="xl">
			<Title component={"h2"}>Attached Documents</Title>
			<FilesDropzone
				mt="md"
				onDrop={(files) => {
					console.log(files);
				}}
			/>
			<Group justify="end" mt="xl">
				<TextInput
					placeholder="Search attachments"
					leftSection={<IconSearch />}
				/>
			</Group>
			<Stack gap="lg" mt="md">
				<FileCard />
				<FileCard />
				<FileCard />
				<FileCard />
			</Stack>
		</Box>
	);
}
