import type { UseTableOptions } from "@/hooks/use-our-table";
import type { Doctor } from "@/lib/types";
import { MantineReactTable } from "mantine-react-table";
import useDoctorsTable from "./use-employees-table";

export function DoctorsTable(options: UseTableOptions<Doctor>) {
	const doctorsTable = useDoctorsTable(options);
	return <MantineReactTable table={doctorsTable} />;
}
