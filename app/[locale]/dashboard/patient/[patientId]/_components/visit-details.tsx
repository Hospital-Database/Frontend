"use client";

import DetailsCard from "@/components/site/details-card";
import { formatElapsedTime } from "@/lib/datetime";
import { useFormatter, useNow } from "next-intl";

export default function VisitDetails({ patientId: _ }: { patientId: string }) {
	const formatter = useFormatter();
	const startedAt = useNow();
	const now = useNow({ updateInterval: 1000 });
	return (
		<DetailsCard
			title="Current visit"
			details={[
				{ title: "Ticket", value: 128746817234 },
				{ title: "Duration", value: formatElapsedTime(startedAt, now) },
				{
					title: "Started at",
					value: formatter.dateTime(startedAt, {
						timeStyle: "short",
						dateStyle: "long",
					}),
				},
			]}
		/>
	);
}
