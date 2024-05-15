"use client";
import { Group, Stack, Text } from "@mantine/core";

export default function DetailsCard({
	title,
	details,
}: { title?: string; details: { title: string; value: React.ReactNode }[] }) {
	return (
		<div className="border border-slate-200 dark:border-slate-700 p-2 md:p-4 bg-gray-500/10 rounded">
			{title && (
				<Text size="lg" mb="lg">
					{title}
				</Text>
			)}
			<Stack gap={"md"}>
				{details.map(({ title, value }) => {
					return (
						<Group key={title}>
							<Text className="text-muted-fg min-w-[150px]">{title}</Text>
							<Text>{value}</Text>
						</Group>
					);
				})}
			</Stack>
		</div>
	);
}
