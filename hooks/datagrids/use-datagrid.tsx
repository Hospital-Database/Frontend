import { ActionIcon, Tooltip } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import { IconRefresh } from "@tabler/icons-react";
import type { UseQueryResult, WithRequired } from "@tanstack/react-query";
import { merge } from "lodash";
import {
	type MRT_ColumnFilterFnsState,
	type MRT_ColumnFiltersState,
	type MRT_PaginationState,
	type MRT_RowData,
	type MRT_SortingState,
	type MRT_TableOptions,
	useMantineReactTable,
} from "mantine-react-table";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useState } from "react";

export interface FetchOptions {
	columnFilterFns: MRT_ColumnFilterFnsState;
	columnFilters: MRT_ColumnFiltersState;
	globalFilter: string;
	pagination: MRT_PaginationState;
	sorting: MRT_SortingState;
}

export default function useDatagrid<TData extends MRT_RowData>(
	useFetchData: (
		fetchOptions: FetchOptions,
	) => UseQueryResult<{ count: number; results: TData[] }>,
	tableOptions: WithRequired<Partial<MRT_TableOptions<TData>>, "columns">,
) {
	//Manage MRT state that we want to pass to our API
	const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
		[],
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
	const { data, isError, isFetching, isLoading, refetch, error } =
		useFetchData(fetchOptions);

	//this will depend on your API response shape
	const fetchedData = data?.results ?? [];
	const totalRowCount = data?.count ?? 0;

	return useMantineReactTable(
		merge(
			{
				mantineToolbarAlertBannerProps: isError
					? {
							color: "red",
							children: (
								<>
									<p>Error loading data</p>
									<p>{error?.toString()}</p>
								</>
							),
						}
					: undefined,
				renderTopToolbarCustomActions: () => (
					<Tooltip label="Refresh Data">
						<ActionIcon variant="subtle" c="white" onClick={() => refetch()}>
							<IconRefresh />
						</ActionIcon>
					</Tooltip>
				),

				data: fetchedData,
				enableBottomToolbar: false,
				enableColumnResizing: true,
				enableGlobalFilterModes: true,
				enablePagination: false,
				enableColumnPinning: true,
				enableRowNumbers: true,
				manualFiltering: true,
				manualPagination: true,
				manualSorting: true,
				onColumnFilterFnsChange: setColumnFilterFns,
				onColumnFiltersChange: setColumnFilters,
				onGlobalFilterChange: setGlobalFilter,
				onPaginationChange: setPagination,
				onSortingChange: setSorting,
				rowCount: totalRowCount,
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
}
