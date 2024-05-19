import { useDeleteAttachment, useUpdateAttachment } from "@/api/attachments";
import NA from "@/components/NA";
import { usePermissions } from "@/hooks/use-permissions";
import type { Attachment } from "@/lib/types";
import {
	ActionIcon,
	Button,
	Card,
	Group,
	Menu,
	Modal,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDots } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "mantine-form-zod-resolver";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

const attachementSchmea = z.object({
	file_name: z.string(),
	kind: z.string(),
});

export default function AttachmentCard({
	attachment,
}: { attachment: Attachment }) {
	const [isDeleting, setIsDeleting] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const queryClient = useQueryClient();
	const updateAttachment = useUpdateAttachment({
		onSuccess() {
			setIsEditing(false);
		},
	});
	const deleteMutation = useDeleteAttachment(attachment.id, "soft", {
		onSuccess() {
			setIsDeleting(false);
			queryClient.invalidateQueries({
				queryKey: ["attachments"],
			});
		},
	});
	const t = useTranslations("Patient");
	const perms = usePermissions();
	const form = useForm({
		initialValues: {
			file_name: attachment.file_name || "",
			kind: attachment.kind || "",
		},
		validate: zodResolver(attachementSchmea),
	});

	return (
		<Card shadow="sm" radius="md">
			<Group justify="space-between" align={"start"}>
				<Group gap="md" align="start">
					<Image
						src={getFileIcon(attachment.file_type.toUpperCase())}
						alt="file icon"
						className="w-[70px] aspect-square"
						width={100}
						height={100}
					/>
					<div>
						<Text fw="bold">
							{attachment.file_name || <NA>{t("no-file-name")}</NA>}
						</Text>
						<Text c="grey">
							{attachment.kind || <NA>{t("no-file-description")}</NA>}
						</Text>
					</div>
				</Group>
				<Group gap={"sm"}>
					<Link href={attachment.file} target="_blank">
						<Button variant="default">{t("download")}</Button>
					</Link>
					{perms.patient.canUpdatePatient() && (
						<Menu>
							<Menu.Target>
								<ActionIcon size={"lg"} variant="default">
									<IconDots size={20} />
								</ActionIcon>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item onClick={() => setIsEditing(true)}>
									{t("edit-attachment")}
								</Menu.Item>
								<Menu.Item color="red" onClick={() => setIsDeleting(true)}>
									{t("delete")}
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					)}
				</Group>
			</Group>
			<Modal
				opened={isDeleting}
				onClose={() => setIsDeleting(false)}
				withCloseButton={false}
				title="Delete attachment"
			>
				<Title component={"h4"} fz={"h4"} mb="md">
					{t("are-you-sure-you-want-to-delete-this-file")}
				</Title>
				<Group justify="end">
					<Button variant="default" onClick={() => setIsDeleting(false)}>
						{t("cancel")}
					</Button>
					<Button
						color="red"
						loading={deleteMutation.isPending}
						onClick={() => deleteMutation.mutate()}
					>
						{t("delete")}
					</Button>
				</Group>
			</Modal>
			<Modal
				opened={isEditing}
				onClose={() => setIsEditing(false)}
				withCloseButton={false}
				title={t("edit-attachment-name")}
			>
				<form
					onSubmit={form.onSubmit((values) =>
						updateAttachment.mutate({ data: values, id: attachment.id }),
					)}
				>
					<div className="space-y-5">
						<TextInput
							withAsterisk
							label={t("attachment-name")}
							{...form.getInputProps("file_name")}
						/>
						<TextInput
							withAsterisk
							label={t("file-desciption")}
							{...form.getInputProps("kind")}
						/>
					</div>
					<Group justify="end" mt="md">
						<Button variant="default" onClick={() => setIsEditing(false)}>
							{t("cancel")}
						</Button>
						<Button
							color="green"
							loading={updateAttachment.isPending}
							type="submit"
						>
							{t("update")}
						</Button>
					</Group>
				</form>
			</Modal>
		</Card>
	);
}

function getFileIcon(fileType: string) {
	if (knownFiles.includes(fileType)) {
		return `/file-icons/${fileType}.svg`;
	}
	return "/file-icons/UNKNOWN.svg";
}

const knownFiles = [
	"AI",
	"AVI",
	"BMP",
	"CRD",
	"CSV",
	"DLL",
	"DOC",
	"DOCX",
	"DWG",
	"EPS",
	"EXE",
	"FLV",
	"GIFF",
	"HTML",
	"ISO",
	"JAVA",
	"JPG",
	"MDB",
	"MID",
	"MOV",
	"MP3",
	"MP4",
	"MPEG",
	"PDF",
	"PNG",
	"PPT",
	"PS",
	"PSD",
	"PUB",
	"RAR",
	"RAW",
	"RSS",
	"SVG",
	"TIFF",
	"TXT",
	"WAV",
	"WMA",
	"XML",
	"XSL",
	"ZIP",
];
