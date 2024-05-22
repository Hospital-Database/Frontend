import "@mantine/dropzone/styles.css";

import { useAttachments } from "@/api/attachments";
import type { Patient } from "@/lib/types";
import { Box, Group, Loader, Stack, TextInput, Title } from "@mantine/core";
import { IconFileAlert, IconFiles, IconSearch } from "@tabler/icons-react";
import { debounce } from "lodash";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import AttachmentCard from "./attachment-card";
import { FilesDropzone } from "./files-dropzone";

export default function PatientDocuments({ patient }: { patient: Patient }) {
	const [searchValue, setSearchValue] = useState("");
	const onChange = useCallback(
		debounce((value: string) => {
			setSearchValue(value);
		}, 500),
		[],
	);
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
			{
				id: "kind",
				value: searchValue,
			},
		],
		columnFilterFns: {
			kind: "contains",
		},
	});

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
					placeholder="Search by file description"
					leftSection={<IconSearch />}
					onChange={(value) => onChange(value.target.value)}
				/>
			</Group>
			{attachments.isLoading ? (
				<div className="py-8 grid place-content-center">
					<Loader />
				</div>
			) : attachments.isError ? (
				<AttachmentNotFound>
					<IconFileAlert />
					{t("error-fetching-attachments")}
				</AttachmentNotFound>
			) : !attachments.data || attachments.data.results.length === 0 ? (
				<AttachmentNotFound>
					<IconFiles />
					{t("no-attachments-found")}
				</AttachmentNotFound>
			) : (
				<Stack gap="lg" mt="md">
					{attachments.data.results.map((att) => (
						<AttachmentCard attachment={att} key={att.id} />
					))}
				</Stack>
			)}
		</Box>
	);
}

function AttachmentNotFound({ children }: { children: ReactNode }) {
	return (
		<div className="border border-slate-200 dark:border-slate-700 p-6 bg-gray-500/10 rounded  text-xl md:py-12 mt-5 flex justify-center items-center">
			{children}
		</div>
	);
}
