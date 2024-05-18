import { MantineReactTable } from "mantine-react-table";
import useVisitsTable from "./use-visits-table";
import type { UseTableOptions } from "@/hooks/use-our-table";
import type { Visit } from "@/lib/types";

export function VisitsTable(options: UseTableOptions<Visit>) {
	const visitsTable = useVisitsTable(options);
	return <MantineReactTable table={visitsTable} />;
}
