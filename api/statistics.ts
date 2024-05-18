import { http } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

async function getStatistics() {
	return await http.get<{
		total_visits: number;
		total_patients: number;
		total_doctors: number;
		total_employees: number;
	}>("/visit/statistics/");
}

export function useGetStatistics() {
	return useQuery({
		queryKey: ["statistics"],
		queryFn: getStatistics,
	});
}
