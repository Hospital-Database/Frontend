import type { MRT_FilterOption } from "mantine-react-table";
import type { FetchOptions } from "../hooks/datagrids/use-datagrid";

export default function getTableSearchParams({
	columnFilterFns,
	columnFilters,
	globalFilter,
	pagination,
	sorting,
}: FetchOptions) {
	const params = new URLSearchParams();

	if (pagination) {
		params.set("page", (pagination.pageIndex + 1).toString());
		params.set("limit", pagination.pageSize.toString());
	}

	if (sorting && sorting.length > 0)
		params.append(
			"ordering",
			sorting.map(({ id, desc }) => (desc ? `-${id}` : id)).join(),
		);

	if (globalFilter) params.set("search", globalFilter);

	if (columnFilters)
		for (const { id, value } of columnFilters) {
			if (typeof value === "string")
				params.set(`${id}${getOperator(columnFilterFns?.[id])}`, value);
		}

	return params;
}

function getOperator(op?: MRT_FilterOption) {
	if (op === "contains") return "__icontains";
	return "";
}
