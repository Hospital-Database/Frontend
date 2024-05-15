import "@mantine/dropzone/styles.css";

import type { Patient } from "@/lib/types";
import { Box, Group, Stack, TextInput, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import FileCard from "./file-card";
import { FilesDropzone } from "./files-dropzone";

export default function PatientDocuments({ patient: _ }: { patient: Patient }) {
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
