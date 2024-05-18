import "@mantine/dropzone/styles.css";

import { useAttachments } from "@/api/attachments";
import type { Patient } from "@/lib/types";
import { Box, Group, Loader, Stack, TextInput, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import AttachmentCard from "./file-card";
import { FilesDropzone } from "./files-dropzone";

export default function PatientDocuments({ patient }: { patient: Patient }) {
	const t = useTranslations("Patient");
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
	if (attachments.isError) return <div>{t("error-fetching-attachments")}</div>;
	if (!attachments.data) return <div>{t("no-attachments-found")}</div>;

	return (
		<Box mt="xl">
			<Title component={"h2"} mb="md">
				{t("attached-documents")}
			</Title>
			{/**I tried to call onDrop here give me error
			 *useMutation Render more than one time Error:
			 * */}
			<FilesDropzone patient={patient} />
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
