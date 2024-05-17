"use client";
import { MantineReactTable } from "mantine-react-table";
import usePatientsTable from "./use-patients-table";

export default function PatientsTable() {
	const patientsTable = usePatientsTable();
	return <MantineReactTable table={patientsTable} />;
}
