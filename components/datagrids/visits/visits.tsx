import { MantineReactTable } from "mantine-react-table";
import useVisitsTable from "./use-visits-table";

export function VisitsTable(options: Parameters<typeof useVisitsTable>[0]) {
	const visitsTable = useVisitsTable(options);
	return <MantineReactTable table={visitsTable} />;
}
