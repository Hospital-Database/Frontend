"use client";
import { useGetStatistics } from "../api/statistics";

export default function DashboardHeader() {
	const { data } = useGetStatistics();
	console.log(data);
	return (
		<section className="grid grid-cols-3 gap-x-3">
			<HeaderCard
				text="Total patients"
				statistics={data?.data?.total_patients}
			/>
			<HeaderCard text="Total Doctors" statistics={data?.data?.total_doctors} />
			<HeaderCard
				text="Total Employees"
				statistics={data?.data?.total_employees}
			/>
		</section>
	);
}
function HeaderCard({
	text,
	statistics,
}: { text: string; statistics: number }) {
	return (
		<div className="border border-blue-400 px-3 py-2 rounded-lg space-y-3">
			<p className="text-blue-600 text-xl font-medium">{text}</p>
			<p className="text-3xl">{statistics}</p>
		</div>
	);
}
