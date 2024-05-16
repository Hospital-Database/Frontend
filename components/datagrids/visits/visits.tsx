import { MantineReactTable } from "mantine-react-table";
import useVisitsTable from "./use-visits-table";

export function VisitsTable() {
	const visitsTable = useVisitsTable();
	return <MantineReactTable table={visitsTable} />;
}
