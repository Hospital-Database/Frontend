import pDebounce from "p-debounce";

const expensiveCall = async (value) => {
	await new Promise((res) => setTimeout(res, 200));
	return value;
};

const debouncedFn = pDebounce(expensiveCall, 1200);

for (const number of [1, 2, 3]) {
	console.log(await debouncedFn(number));
}
