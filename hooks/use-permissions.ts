import { userTypeTokenCookie } from "@/lib/cookies.client";
import { useMemo } from "react";

export type UserType = "patient" | "doctor" | "admin";

export function usePermissions() {
	const userType = userTypeTokenCookie.get();

	return useMemo(
		() => ({
			patient: getPatientPermissions(userType),
			doctor: getDoctorPermissions(userType),
			visit: getVisitPermissions(userType),
			dashboard: getDashboardPermissions(userType),
		}),
		[userType],
	);
}

function getPatientPermissions(userType?: UserType) {
	return {
		canSeePatient() {
			return userType === "admin" || userType === "doctor";
		},
		canAddPatient() {
			return userType === "admin";
		},
		canUpdatePatient() {
			return userType === "admin";
		},
		canDeletePatient() {
			return userType === "admin";
		},
	};
}

function getDoctorPermissions(userType?: UserType) {
	return {
		canSeeDoctors() {
			return userType === "admin";
		},
		canAddDoctor() {
			return userType === "admin";
		},
		canUpdateDoctor() {
			return userType === "admin";
		},
		canDeleteDoctor() {
			return userType === "admin";
		},
	};
}

function getVisitPermissions(userType?: UserType) {
	return {
		canChangeVisitState() {
			return userType === "admin" || userType === "doctor";
		},
		canDeleteVisit() {
			return userType === "admin" || userType === "doctor";
		},
		canCreateVisit() {
			return userType === "admin" || userType === "doctor";
		},
		canEditVisit() {
			return userType === "admin" || userType === "doctor";
		},
	};
}

function getDashboardPermissions(userType?: UserType) {
	return {
		canSeeDashboard() {
			return userType === "admin" || userType === "doctor";
		},
		canSeeStatistics() {
			return userType === "admin";
		},
	};
}
