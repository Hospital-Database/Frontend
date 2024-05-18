"use client";

import { useUpdateVisit, useVisits } from "@/api/visits";
import DetailsCard from "@/components/details-card";
import { formatElapsedTime } from "@/lib/datetime";
import { useRouter } from "@/navigation";
import { ActionIcon, Menu } from "@mantine/core";
import { useFormatter, useNow, useTranslations } from "next-intl";

import { useDeleteVisit } from "@/api/visits";
import { IconDots } from "@tabler/icons-react";

export default function VisitDetails({ patientId }: { patientId: string }) {
	const formatter = useFormatter();
	const now = useNow({ updateInterval: 1000 });
	const t = useTranslations("Patient");
	const { data } = useVisits({
		columnFilters: [{ id: "patient", value: patientId }],
	});
	const visitData = data?.results?.filter((item) => item.status === "pending");
	if (!visitData || visitData.length < 1) return <> </>;
	const date = new Date(visitData[0].created_at);

	return (
		<>
			{visitData?.[0] && (
				<>
					<div className="w-fit ml-auto">
						<VisitAction visitData={visitData[0]} />
					</div>
					<DetailsCard
						title={t("current-visit")}
						details={[
							{ title: t("ticket"), value: visitData?.[0].ticket },
							{
								title: t("duration"),
								value: formatElapsedTime(new Date(date), now),
							},
							{
								title: t("started-at"),
								value: formatter.dateTime(new Date(date), {
									year: "numeric",
									month: "short",
									day: "numeric",
								}),
							},
						]}
					/>
				</>
			)}
		</>
	);
}

function VisitAction({ visitData }: { visitData: Visit }) {
	const router = useRouter();
	const deteteVisit = useDeleteVisit();
	const updateVisit = useUpdateVisit();
	const t = useTranslations("Patient");
	return (
		<Menu>
			<Menu.Target>
				<ActionIcon size={"lg"} variant="default">
					<IconDots size={20} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item
					onClick={() => updateVisit.mutate({ ...visitData, status: "done" })}
				>
					End visit
				</Menu.Item>
				<Menu.Item
					onClick={() =>
						updateVisit.mutate({ ...visitData, status: "canceled" })
					}
				>
					Cancel visit
				</Menu.Item>
				<Menu.Item
					color="red"
					onClick={() => {
						deteteVisit.mutate({ id: visitData.id, ticket: visitData.ticket });
					}}
				>
					delete visit
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
