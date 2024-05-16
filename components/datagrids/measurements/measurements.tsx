import type { UseTableOptions } from "@/hooks/use-our-table";
import type { Measurement } from "@/lib/types";
import { MantineReactTable } from "mantine-react-table";
import useMeasurementsTable from "./use-measurements-table";

export function MeasurementsTable(
	options: UseTableOptions<Measurement & { date: string }>,
) {
	const measurementsTable = useMeasurementsTable(options);
	return <MantineReactTable table={measurementsTable} />;
}
