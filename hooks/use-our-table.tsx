import { getErrorMessageSync } from "@/lib/err-msg";
import getTableSearchParams from "@/lib/get-search-params";
import { notifyError } from "@/lib/notifications";
import { ActionIcon, Button, Group, Menu, Tooltip } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import { IconDownload, IconRefresh } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { get, merge } from "lodash";
//@ts-ignore
import { MRT_Localization_AR } from "mantine-react-table/locales/ar";

import {
	type MRT_ColumnDef,
	type MRT_ColumnFilterFnsState,
	type MRT_ColumnFiltersState,
	type MRT_PaginationState,
	type MRT_RowData,
	type MRT_SortingState,
	type MRT_TableOptions,
	useMantineReactTable,
} from "mantine-react-table";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useTranslations } from "next-intl";
import { useEffect, useId, useMemo, useState } from "react";

export type UseTableOptions<TData extends MRT_RowData> =
	| {
			data?: TData[];
			initialFilters?: MRT_ColumnFiltersState;
			tableOptions?: Partial<MRT_TableOptions<TData>>;
			globalFilter?: string;
			deleted?: boolean;
	  }
	| undefined;

export interface FetchOptions {
	columnFilterFns?: MRT_ColumnFilterFnsState;
	columnFilters?: MRT_ColumnFiltersState;
	globalFilter?: string;
	pagination?: MRT_PaginationState;
	sorting?: MRT_SortingState;
}

export type OurTableColumnDef<TData extends MRT_RowData> =
	MRT_ColumnDef<TData> & {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		getExportedValue?: (value: any) => string | null | boolean;
	};

const csvConfig = mkConfig({
	fieldSeparator: ";",
	decimalSeparator: ".",
	useKeysAsHeaders: true,
});

const handleExportRows = <TData extends MRT_RowData>(data: TData[]) => {
	const csv = generateCsv(csvConfig)(data);
	download(csvConfig)(csv);
};

const getExportedRow = <TData extends MRT_RowData>(
	columns: OurTableColumnDef<TData>[],
	row: TData,
) => {
	const exportedRow: Record<string, string | null | boolean> = {};
	for (const column of columns) {
		if (!column.accessorKey) continue;
		if (typeof column.getExportedValue === "function")
			exportedRow[column.accessorKey] = column.getExportedValue(row);
		else exportedRow[column.accessorKey] = get(row, column.accessorKey);
	}
	return exportedRow;
};

export default function useOurTable<TData extends MRT_RowData>(
	{
		id: idProp,
		manual = true,
		deleted,
		fetchData,
		initialFilters,
		globalFilter: outsideGlobalFilter,
	}: {
		id?: string;
		deleted?: boolean;
		manual?: boolean;
		globalFilter?: string;
		initialFilters?: MRT_ColumnFiltersState;
		fetchData: (fetchOptions: FetchOptions) => Promise<{
			count: number;
			results: TData[];
		}>;
	},
	tableOptions: Omit<Partial<MRT_TableOptions<TData>>, "columns"> & {
		columns: OurTableColumnDef<TData>[];
	},
) {
	const t = useTranslations("Table");
	const $t = useTranslations();
	const tempId = useId();

	const id = useMemo(() => {
		if (idProp) return idProp;
		return tempId;
	}, [tempId, idProp]);

	const [isExporting, setIsExporting] = useState(false);
	//Manage MRT state that we want to pass to our API
	const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
		initialFilters || [],
	);
	const [columnFilterFns, setColumnFilterFns] = //filter modes
		useState<MRT_ColumnFilterFnsState>(
			Object.fromEntries(
				tableOptions.columns.map(({ accessorKey }) => [
					accessorKey,
					"contains",
				]),
			),
		); //default to "contains" for all columns
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState<MRT_SortingState>([]);
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const fetchOptions = {
		columnFilterFns,
		columnFilters,
		globalFilter,
		pagination,
		sorting,
	};

	//call our custom react-query hook
	const { data, isError, isFetching, isLoading, refetch, error } = useQuery({
		queryKey: [
			deleted ? `${id}-deleted` : id,
			getTableSearchParams(fetchOptions).toString(),
		],
		queryFn: () => fetchData(fetchOptions),
	});

	//this will depend on your API response shape
	const fetchedData = data?.results ?? [];
	const totalRowCount = data?.count ?? 0;

	const table = useMantineReactTable(
		merge(
			{
				mantineToolbarAlertBannerProps: isError
					? {
							color: "red",
							children: (
								<>
									<p>{t("error-loading-data")}</p>
									<p>{error?.toString()}</p>
								</>
							),
						}
					: undefined,
				renderTopToolbarCustomActions: () => (
					<Group>
						<Tooltip label="Refresh Data">
							<ActionIcon variant="subtle" c="white" onClick={() => refetch()}>
								<IconRefresh />
							</ActionIcon>
						</Tooltip>
						<Menu>
							<Menu.Target>
								<Button
									leftSection={<IconDownload />}
									variant="subtle"
									c="white"
								>
									{t("export")}
								</Button>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item
									disabled={
										table.getPrePaginationRowModel().rows.length === 0 ||
										isExporting
									}
									//export all rows, including from the next page, (still respects filtering and sorting)
									onClick={async () => {
										setIsExporting(true);
										try {
											const { results: allData } = await fetchData({
												...fetchOptions,
												pagination: {
													pageIndex: 0,
													pageSize: totalRowCount,
												},
											});
											handleExportRows(
												allData.map((obj) =>
													getExportedRow(tableOptions.columns, obj),
												),
											);
										} catch (e) {
											const message = getErrorMessageSync(e, $t);
											notifyError({
												title: "Couldn't export all the rows",
												message,
											});
										}
										setIsExporting(false);
									}}
									leftSection={<IconDownload />}
								>
									{t("export-all-rows")}
								</Menu.Item>
								<Menu.Item
									disabled={table.getRowModel().rows.length === 0}
									//export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
									onClick={() =>
										handleExportRows(
											table
												.getRowModel()
												.rows.map((row) =>
													getExportedRow(tableOptions.columns, row.original),
												),
										)
									}
									leftSection={<IconDownload />}
								>
									{t("export-page-rows")}
								</Menu.Item>
								<Menu.Item
									disabled={
										!table.getIsSomeRowsSelected() &&
										!table.getIsAllRowsSelected()
									}
									//only export selected rows
									onClick={() =>
										handleExportRows(
											table
												.getSelectedRowModel()
												.rows.map((row) =>
													getExportedRow(tableOptions.columns, row.original),
												),
										)
									}
									leftSection={<IconDownload />}
								>
									{t("export-selected-rows")}
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Group>
				),

				data: fetchedData,
				enableRowSelection: true,
				enableBottomToolbar: true,
				enableFullScreenToggle: true,
				enableColumnResizing: true,
				enableGlobalFilterModes: true,
				enablePagination: true,
				enableColumnPinning: true,
				enableRowNumbers: true,
				manualFiltering: manual,
				manualPagination: manual,
				manualSorting: manual,
				onColumnFilterFnsChange: setColumnFilterFns,
				onColumnFiltersChange: setColumnFilters,
				onGlobalFilterChange: setGlobalFilter,
				onPaginationChange: setPagination,
				onSortingChange: setSorting,
				rowCount: totalRowCount,
				localization: MRT_Localization_AR,
				state: {
					columnFilterFns,
					columnFilters,
					globalFilter,
					isLoading,
					pagination,
					showAlertBanner: isError,
					showProgressBars: isFetching,
					sorting,
				},
			},
			tableOptions,
		),
	);

	useEffect(() => {
		table.setGlobalFilter(outsideGlobalFilter);
	}, [outsideGlobalFilter, table.setGlobalFilter]);

	return table;
}
