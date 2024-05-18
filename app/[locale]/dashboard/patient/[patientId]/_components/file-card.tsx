import { useDeleteAttachment } from "@/api/attachments";
import NA from "@/components/NA";
import type { Attachment } from "@/lib/types";
import {
	ActionIcon,
	Button,
	Card,
	Group,
	Menu,
	Modal,
	Text,
	Title,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AttachmentCard({
	attachment,
}: { attachment: Attachment }) {
	const [isDeleting, setIsDeleting] = useState(false);
	const queryClient = useQueryClient();
	const deleteMutation = useDeleteAttachment(attachment.id, "soft", {
		onSuccess() {
			setIsDeleting(false);
			queryClient.invalidateQueries({
				queryKey: ["attachments"],
			});
		},
	});
	const t = useTranslations("Patient");
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
					<Text fw="bold">
						{attachment.file_name || <NA>{t("no-file-name")}</NA>}
					</Text>
				</Group>
				<Group gap={"sm"}>
					<Link href={attachment.file} target="_blank">
						<Button variant="default">{t("download")}</Button>
					</Link>
					<Menu>
						<Menu.Target>
							<ActionIcon size={"lg"} variant="default">
								<IconDots size={20} />
							</ActionIcon>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item>{t("edit")}</Menu.Item>
							<Menu.Item color="red" onClick={() => setIsDeleting(true)}>
								{t("delete")}
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
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
