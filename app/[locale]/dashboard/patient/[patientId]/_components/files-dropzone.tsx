import { Group, Text, rem } from "@mantine/core";
import { Dropzone, type DropzoneProps } from "@mantine/dropzone";
import { IconFileText, IconUpload, IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export function FilesDropzone(props: Omit<DropzoneProps, "maxSize">) {
	const t = useTranslations("Patient");
	return (
		<Dropzone maxSize={10 * 1024 ** 2} {...props}>
			<Group
				justify="center"
				gap="xl"
				mih={220}
				style={{ pointerEvents: "none" }}
			>
				<Dropzone.Accept>
					<IconUpload
						style={{
							width: rem(52),
							height: rem(52),
							color: "var(--mantine-color-blue-6)",
						}}
						stroke={1.5}
					/>
				</Dropzone.Accept>
				<Dropzone.Reject>
					<IconX
						style={{
							width: rem(52),
							height: rem(52),
							color: "var(--mantine-color-red-6)",
						}}
						stroke={1.5}
					/>
				</Dropzone.Reject>
				<Dropzone.Idle>
					<IconFileText
						style={{
							width: rem(52),
							height: rem(52),
							color: "var(--mantine-color-dimmed)",
						}}
						stroke={1.5}
					/>
				</Dropzone.Idle>

				<div>
					<Text size="xl" inline>
						{t("drag-files-here-or-click-to-select-files")}
					</Text>
					<Text size="sm" c="dimmed" inline mt={7}>
						{t(
							"attach-as-many-files-as-you-like-each-file-should-not-exceed-10mb",
						)}
					</Text>
				</div>
			</Group>
		</Dropzone>
	);
}
