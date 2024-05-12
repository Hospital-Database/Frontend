export interface Visit {
	id: number;
	measurement: Measurement;
	attachment: Attachment[];
	visit_number: number;
	ticket: string;
	datatime: string;
	created_at: string;
	updated_at: string;
	notes: string;
	patient: number;
	doctors: number[];
}

export interface Measurement {
	height?: string;
	weight?: string;
	blood_pressure?: string;
	temperature?: string;
	pulse?: string;
	oxygen_level?: string;
}

export interface ExtractedMeasurement {
	date: string;
	height?: number;
	weight?: number;
	blood_pressure?: number;
	temperature?: number;
	pulse?: number;
	oxygen_level?: number;
}

export interface Attachment {
	id: number;
	url: string;
	created_at: string;
	updated_at: string;
	file: string; // uri
	kind: string;
	notes: string;
	visit: number;
}

export interface Patient {
	nationalId: string;
	fullName: string;
	patientImage: string;
	phoneNumber: string;
	gender: string;
	martialStatus: string;

	government: string;
	status: string;
	street: string;
	dateOfBirth: Date;
	notes: string;
}

export interface User {
	id: number;
	/** datetime */
	last_login: string;
	is_superuser: boolean;
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	is_staff: boolean;
	is_active: boolean;
	/** datetime */
	date_joined: string;
}

export interface BackendError {
	detail: string;
}
