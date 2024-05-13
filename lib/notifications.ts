import { notifications } from "@mantine/notifications";

export function notifySuccess({
	title,
	message,
}: { title: string; message: string }) {
	notifications.show({
		title,
		message,
		color: "white",
		style: { backgroundColor: "#22c55e" },
	});
}

export function notifyError({
	title,
	message,
}: { title: string; message: string }) {
	notifications.show({
		title,
		message,

		color: "white",
		style: { backgroundColor: "#ef4444" },
	});
}
