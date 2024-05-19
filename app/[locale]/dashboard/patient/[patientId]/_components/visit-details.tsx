"use client";

import { useDeleteVisit, useUpdateVisit, useVisits } from "@/api/visits";
import NA from "@/components/NA";
import DetailsCard, { DetailsCardSkeleton } from "@/components/details-card";
import { formatElapsedTime } from "@/lib/datetime";
import type { Visit } from "@/lib/types";
import {
	ActionIcon,
	Flex,
	Group,
	Menu,
	SegmentedControl,
	Stack,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { useFormatter, useLocale, useNow, useTranslations } from "next-intl";
import { type ReactNode, useState } from "react";

export default function VisitDetails({ patientId }: { patientId: string }) {
	const [tab, setTab] = useState<tabType>("pending");
	type tabType = "pending" | "canceled" | "done";
	const formatter = useFormatter();
	const now = useNow({ updateInterval: 1000 });
	const t = useTranslations("Patient");
	const { data, isLoading } = useVisits({
		columnFilters: [{ id: "patient", value: patientId }],
	});
	const pendingVisit =
		data?.results?.filter((item) => item.status === "pending") || [];
	const canceledVisits =
		data?.results?.filter((item) => item.status === "canceled") || [];
	const doneVisits =
		data?.results?.filter((item) => item.status === "done") || [];
	return (
		<main>
			<Flex mb="sm">
				<Group>
					<span>{t("visits")}:</span>
					<SegmentedControl
						radius="xl"
						data={[
							{ value: "pending", label: t("current") },
							{
								value: "canceled",
								label: t("canceled"),
							},
							{ value: "done", label: t("done") },
						]}
						onChange={(val) => {
							setTab(val as tabType);
						}}
					/>
				</Group>
			</Flex>
			{isLoading && <DetailsCardSkeleton />}
			{pendingVisit.length > 0 && tab === "pending" ? (
				<Stack>
					<ActionContainer>
						<VisitAction visitData={pendingVisit[0]} />
					</ActionContainer>
					<DetailsCard
						title={t("current-visit")}
						details={[
							{ title: t("ticket"), value: pendingVisit?.[0].ticket },
							{
								title: t("duration"),
								value: pendingVisit[0]?.start_at ? (
									formatElapsedTime(new Date(pendingVisit[0]?.start_at), now)
								) : (
									<NA />
								),
							},
							{
								title: t("started-at"),
								value: pendingVisit[0]?.start_at ? (
									formatter.dateTime(new Date(pendingVisit[0]?.start_at), {
										year: "numeric",
										month: "short",
										day: "numeric",
									})
								) : (
									<NA />
								),
							},
							{
								title: t("end_at"),
								value: pendingVisit[0]?.end_at ? (
									formatter.dateTime(new Date(pendingVisit[0]?.end_at), {
										year: "numeric",
										month: "short",
										day: "numeric",
									})
								) : (
									<NA />
								),
							},
							{
								title: t("notes"),
								value: pendingVisit[0]?.notes || <NA />,
							},
						]}
					/>
				</Stack>
			) : (
				!isLoading &&
				tab === "pending" && <NoVisit>{t("no-active-visit")}</NoVisit>
			)}
			{canceledVisits.length > 0 && tab === "canceled" ? (
				<>
					{canceledVisits.map((item) => (
						<div key={item.ticket} className="mb-2">
							<ActionContainer>
								<CanceledAction cancelledVisit={item} />
							</ActionContainer>
							<DetailsCard
								details={[
									{ title: t("ticket"), value: item.ticket },
									{
										title: t("started-at"),
										value: formatter.dateTime(
											new Date(item.start_at as string),
											{
												year: "numeric",
												day: "numeric",
											},
										),
									},
									{
										title: t("notes"),
										value: item?.notes || <NA />,
									},
								]}
							/>
						</div>
					))}
				</>
			) : (
				!isLoading &&
				tab === "canceled" && <NoVisit>{t("no-cancelled-visit")} </NoVisit>
			)}
			{doneVisits.length > 0 && tab === "done" ? (
				<>
					{doneVisits.map((item) => (
						<div key={item.ticket} className="mb-2">
							<ActionContainer>
								<DoneAction doneVisit={item} />
							</ActionContainer>
							<DetailsCard
								details={[
									{ title: t("ticket"), value: item.ticket },
									{
										title: t("duration"),
										value: formatElapsedTime(
											new Date(item.start_at as string),
											new Date(item.end_at as string),
										),
									},
									{
										title: t("started-at"),
										value: formatter.dateTime(
											new Date(item.start_at as string),
											{
												year: "numeric",
												month: "short",
												day: "numeric",
											},
										),
									},
									{
										title: t("ends-at"),
										value: item?.end_at ? (
											formatter.dateTime(new Date(item?.end_at), {
												year: "numeric",
												month: "short",
												day: "numeric",
											})
										) : (
											<NA />
										),
									},
									{
										title: t("notes"),
										value: item?.notes || <NA />,
									},
								]}
							/>
						</div>
					))}
				</>
			) : (
				!isLoading &&
				tab === "done" && <NoVisit>{t("no-finished-visit")} </NoVisit>
			)}
		</main>
	);
}

function VisitAction({ visitData }: { visitData: Visit }) {
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
					onClick={() =>
						updateVisit.mutate({
							...visitData,
							status: "done",
							end_at: new Date().toISOString(),
						})
					}
				>
					{t("end-visit")}
				</Menu.Item>
				<Menu.Item
					onClick={() =>
						updateVisit.mutate({
							...visitData,
							status: "canceled",
							end_at: "",
						})
					}
				>
					{t("cancel-visit")}
				</Menu.Item>
				<Menu.Item
					color="red"
					onClick={() => {
						deteteVisit.mutate({ id: visitData.id, ticket: visitData.ticket });
					}}
				>
					{t("delete-visit")}
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}

function CanceledAction({ cancelledVisit }: { cancelledVisit: Visit }) {
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
					onClick={() =>
						updateVisit.mutate({
							...cancelledVisit,
							status: "done",
							end_at: new Date().toISOString(),
						})
					}
				>
					{t("end-visit")}
				</Menu.Item>
				<Menu.Item
					color="red"
					onClick={() => {
						deteteVisit.mutate({
							id: cancelledVisit.id,
							ticket: cancelledVisit.ticket,
						});
					}}
				>
					{t("delete-visit")}
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}

function DoneAction({ doneVisit }: { doneVisit: Visit }) {
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
					onClick={() =>
						updateVisit.mutate({
							...doneVisit,
							status: "canceled",
							end_at: "",
						})
					}
				>
					{t("cancel-visit")}
				</Menu.Item>
				<Menu.Item
					color="red"
					onClick={() => {
						deteteVisit.mutate({ id: doneVisit.id, ticket: doneVisit.ticket });
					}}
				>
					{t("delete-visit")}
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}

function NoVisit({ children }: { children: ReactNode }) {
	return (
		<div className="border border-slate-200 dark:border-slate-700 p-2 bg-gray-500/10 rounded text-center text-xl md:py-12">
			{children}
		</div>
	);
}
function ActionContainer({ children }: { children: ReactNode }) {
	const locale = useLocale();
	return (
		<section className={`absolute ${locale === "en" ? "right-4" : "left-4"}`}>
			{children}
		</section>
	);
}
