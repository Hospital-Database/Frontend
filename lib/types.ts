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
	nationality: string;
	/** datetime in ISO format */
	created_at: string;
	/** datetime in ISO format */
	updated_at: string;
	national_id: string;
	full_name: string;
	image: string;
	phone_number: string;
	gender: string;
	martial_status: string;
	government: string;
	status: string;
	street: string;
	/** date in ISO format */
	date_of_birth: string;
	notes: string;
	blood_type: string;
	disease_type: string;
	email: string;
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

export interface Doctor {
	full_name: string;
	gender: string;
	national_id: string;
	speciality: string;
	license_number: string;
	experience_years: number;
	work_days: string;
	id: number;
	email: string;
	marital_status: string;
	nationality: string;
	user: number;
	/** date in ISO format */
	date_of_birth: string;
	notes: string;
	address: {
		street: string;
		city: string;
		governorate: string;
	};
	phone: {
		mobile: string;
	};
	/** datetime in ISO format */
	created_at: string;
	/** datetime in ISO format */
	updated_at: string;
}

export interface BackendError {
	detail: string;
}
