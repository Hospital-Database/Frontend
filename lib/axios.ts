import axios, { isAxiosError } from "axios";
import { BACKEND_URL } from "./constants";
import { accessTokenCookie } from "./cookies.client";

export const http = axios.create({
	baseURL: BACKEND_URL,
});

http.interceptors.request.use(async (config) => {
	const accessToken = accessTokenCookie.get();
	if (accessToken) config.headers.set("Authorization", `Bearer ${accessToken}`);
	return config;
});

http.interceptors.response.use(
	(response) => response,
	async (error) => {
		console.error("====", error);
		// TODO: handle tokens expiration
		handleOtherFailures(error);
	},
);

function handleOtherFailures(error: unknown) {
	if (isAxiosError(error)) {
		if (!error.response) {
			const detail =
				"Can't connect to the backend server, contact the maintainers of the website!";
			throw { ...error, detail };
		}

		throw error.response.data;
	}

	throw { detail: "Something went wrong" };
}
