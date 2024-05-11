import { ActionIcon, Box, Button, Group, Menu, Text } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import Image from "next/image";

export default function FileCard() {
	return (
		<Box className="py-4 px-6 dark:bg-stone-900 bg-stone-200 rounded shadow">
			<Group justify="space-between" align={"start"}>
				<Group gap="md" align="start">
					<Image
						src={getFileIcon("PNG")}
						alt="file icon"
						className="w-[70px] aspect-square"
						width={100}
						height={100}
					/>
					<Text fw="bold">File name here</Text>
				</Group>
				<Group gap={"sm"}>
					<Button variant="default">Preview</Button>
					<Button variant="default">Download</Button>
					<Menu>
						<Menu.Target>
							<ActionIcon size={"lg"} variant="default">
								<IconDots size={20} />
							</ActionIcon>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item>Edit</Menu.Item>
							<Menu.Item>Delete</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</Group>
		</Box>
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
