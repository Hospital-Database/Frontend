"use client";

import useAvatar from "@/hooks/use-avatar";
import type { Patient } from "@/lib/types";
import Image from "next/image";

export default function PatientImage({ patient }: { patient: Patient }) {
	const avatar = useAvatar(patient.image?.image, {
		seed: `patient-${patient.id}`,
		size: 100,
	});

	return (
		<Image
			src={avatar}
			alt={"patient avatar"}
			width={100}
			height={100}
			className="w-full h-full"
		/>
	);
}
