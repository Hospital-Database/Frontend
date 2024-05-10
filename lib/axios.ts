import axios, { type AxiosError } from "axios";
import { BACKEND_URL } from "./constants";

export const http = axios.create({
	baseURL: BACKEND_URL,
});

http.interceptors.request.use(async (config) => {
	const userItem = localStorage.getItem("user");
	const userData = userItem ? JSON.parse(userItem) : {};
	const accessToken = userData.access || "";
	if (accessToken) config.headers.set("Authorization", `Bearer ${accessToken}`);
	return config;
});

http.interceptors.response.use(
	(response) => response,
	async (error) => {
		console.error("====", error);
		handleOtherFailures(error);
	},
);

function handleOtherFailures(error: AxiosError) {
	if (error.code === "ERR_NETWORK") {
		const message =
			"Can't connect to the backend server, contact the maintainers of the website!";
		throw { ...error, message };
	}

	throw error;
}
