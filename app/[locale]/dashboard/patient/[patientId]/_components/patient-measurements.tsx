"use client";

import "@mantine/charts/styles.css";

import useMeasurementsTable from "@/hooks/datagrids/measurements";
import type { ExtractedMeasurement, Visit } from "@/lib/types";
import { AreaChart } from "@mantine/charts";
import { Box, Title } from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";
import { useMemo } from "react";

const colors = [
	"red",
	"teal",
	"grape",
	"gray",
	"cyan",
	"violet",
	"pink",
	"lime",
	"blue",
	"indigo",
	"orange",
	"green",
	"yellow",
];

function extractMeasurement(v: Visit) {
	const date = new Date(v.datatime).getTime() + Math.floor(Math.random() * 1e8);
	return {
		date: new Date(date).toLocaleDateString(),
		height: Math.floor(180 + (Math.random() - 0.5) * 50),
		weight: Math.floor(86 + (Math.random() - 0.5) * 20),
		blood_pressure: Math.floor(120 / 80 + (Math.random() - 0.5) * 20),
		temperature: Math.floor(37 + (Math.random() - 0.5) * 20),
		pulse: Math.floor(80 + (Math.random() - 0.5) * 30),
		oxygen_level: Math.floor(95 + (Math.random() - 0.5) * 20),
	};
}

/** fill gap with previous values */
function fixMeasurements(m: ExtractedMeasurement[]) {
	for (let i = 1; i < m.length; i++) {
		m[i] = { ...m[i - 1], ...m[i] };
	}
	for (let i = m.length - 2; i >= 0; i--) {
		m[i] = { ...m[i + 1], ...m[i] };
	}
	return m;
}

export default function PatientMeasurements({
	patientId: _,
}: { patientId: string }) {
	const measurementsTable = useMeasurementsTable();
	const data = useMemo(() => {
		const v: Visit = {
			attachment: [],
			created_at: new Date().toISOString(),
			datatime: new Date().toISOString(),
			doctors: [],
			id: 0,
			measurement: {},
			notes: "",
			patient: 0,
			updated_at: new Date().toISOString(),
			visit_number: 0,
			ticket: "",
		};
		return fixMeasurements([v, v, v, v, v, v, v].map(extractMeasurement));
	}, []);

	return (
		<Box>
			<Title component={"h2"} mt="xl" mb="md">
				Measurements
			</Title>
			<MantineReactTable table={measurementsTable} />
			<Title component={"h2"} mt="xl" mb="md">
				Charts
			</Title>
			<AreaChart
				h={300}
				data={data}
				dataKey="date"
				series={[
					"height",
					"weight",
					"blood_pressure",
					"temperature",
					"pulse",
					"oxygen_level",
				].map((name, i) => ({
					name,
					color: `${colors[i]}.6`,
				}))}
				curveType="bump"
			/>
		</Box>
	);
}
