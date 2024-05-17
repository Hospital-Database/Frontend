import type { patientSchema } from "@/api/patients";
import { Image, Stack } from "@mantine/core";
import {
	Dropzone,
	type FileWithPath,
	IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import type { UseFormReturnType } from "@mantine/form";
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import type { z } from "zod";
import "./image.css";

export default function UploadImage({
	form,
}: { form: UseFormReturnType<z.infer<typeof patientSchema>> }) {
	const [files, setFiles] = useState<FileWithPath[]>([]);
	const previews = files.map((file) => {
		const imageUrl = URL.createObjectURL(file);
		return (
			<Image
				key={imageUrl}
				src={imageUrl}
				onLoad={() => URL.revokeObjectURL(imageUrl)}
				className="object-contain h-full w-full"
			/>
		);
	});

	return (
		<form>
			<Dropzone
				accept={IMAGE_MIME_TYPE}
				onDrop={(files) => {
					form.setFieldValue("image", files[0]);
					setFiles(files);
				}}
				className="root"
			>
				<IconUpload />
			</Dropzone>

			<Stack h={100}>{previews}</Stack>
		</form>
	);
}
