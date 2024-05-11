import { http } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

async function getStatistics() {
	return await http.get("/visit/statistics/");
}

export function useGetStatistics() {
	return useQuery({
		queryKey: ["statistics"],
		queryFn: getStatistics,
	});
}
