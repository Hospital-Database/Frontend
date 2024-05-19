import { userTypeTokenCookie } from "@/lib/cookies.client";
import { useMemo } from "react";

export type UserType = "patient" | "doctor" | "admin" | "employee";

export function usePermissions() {
	const userType = userTypeTokenCookie.get();

	return useMemo(
		() => ({
			patient: getPatientPermissions(userType),
			doctor: getDoctorPermissions(userType),
			visit: getVisitPermissions(userType),
			employee: getEmployeePermissions(userType),
			dashboard: getDashboardPermissions(userType),
		}),
		[userType],
	);
}

function getPatientPermissions(userType?: UserType) {
	return {
		canSeePatient() {
			return userType === "admin" || userType === "doctor" || userType == "employee";
		},
		canCreatePatient() {
			return userType === "admin" || userType == "employee";
		},
		canUpdatePatient() {
			return userType === "admin" || userType == "employee";
		},
		canDeletePatient() {
			return userType === "admin" || userType == "employee";
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
			return userType === "admin" || userType === "doctor" || userType == "employee";
		},
		canDeleteVisit() {
			return userType === "admin" || userType === "doctor" || userType == "employee";
		},
		canCreateVisit() {
			return userType === "admin" || userType === "doctor" || userType == "employee";
		},
		canEditVisit() {
			return userType === "admin" || userType === "doctor" || userType == "employee";
		},
	};
}

function getDashboardPermissions(userType?: UserType) {
	return {
		canSeeDashboard() {
			return userType === "admin" || userType === "doctor" || userType == "employee";
		},
		canSeeStatistics() {
			return userType === "admin";
		},
	};
}

function getEmployeePermissions(userType?: UserType) {
	return {
		canChangeEmployeeState() {
			return userType === "admin";
		},
		canDeleteEmployee() {
			return userType === "admin";
		},
		canCreateEmployee() {
			return userType === "admin";
		},
		canEditEmployee() {
			return userType === "admin";
		},
	};
}