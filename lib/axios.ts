import axios, { type AxiosError } from "axios";
import { BACKEND_URL } from "./constants";

export const http = axios.create({
	baseURL: BACKEND_URL,
});

http.interceptors.request.use(async (config) => {
	const accessToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2OTEwNTQzLCJpYXQiOjE3MTUxODI1NDMsImp0aSI6ImNlMDFhZTQ0MTM1YzQ4OTNiNGEyZGZlODQ4MjcxNzJlIiwidXNlcl9pZCI6MTl9.N9VLh0gnlSavHl-REGr7pWFvl3UEKkT-c24pj8QG_F8";
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
