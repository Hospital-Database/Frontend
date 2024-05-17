import "@mantine/dropzone/styles.css";

import { useAttachments } from "@/api/attachments";
import type { Patient } from "@/lib/types";
import { Box, Group, Loader, Stack, TextInput, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import AttachmentCard from "./file-card";
import { FilesDropzone } from "./files-dropzone";

export default function PatientDocuments({ patient }: { patient: Patient }) {
	const attachments = useAttachments({
		pagination: {
			pageIndex: 0,
			pageSize: 1e8,
		},
		columnFilters: [
			{
				id: "user",
				value: patient.user,
			},
		],
	});

	if (attachments.isLoading) return <Loader />;
	if (attachments.isError) return <div>Error fetching attachments</div>;
	if (!attachments.data) return <div>No attachments found</div>;

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
				{attachments.data.results.map((att) => (
					<AttachmentCard attachment={att} key={att.id} />
				))}
			</Stack>
		</Box>
	);
}
