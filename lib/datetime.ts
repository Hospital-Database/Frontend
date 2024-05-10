export function formatElapsedTime(start: Date, end: Date) {
	const diff = end.getTime() - start.getTime();
	let seconds = Math.floor(diff / 1000);
	let minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	seconds = seconds % 60;
	minutes = minutes % 60;
	return `${hours < 10 ? "0" : ""}${hours}:${
		minutes < 10 ? "0" : ""
	}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
