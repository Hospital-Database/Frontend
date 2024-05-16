export interface Entity {
	id: number;
	/** datetime in ISO format */
	created_at: string;
	/** datetime in ISO format */
	updated_at: string;
}

export interface Visit extends Entity {
	measurement: Measurement;
	attachment: Attachment[];
	visit_number: number;
	ticket: string;
	datatime: string;
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

export interface Attachment extends Entity {
	url: string;
	/** URI of the file */
	file: string;
	kind: string;
	notes: string;
	visit: number;
}

export interface Patient extends Entity {
	nationality: string;
	national_id: string;
	full_name: string;
	image: string;
	address: Address | null;
	phone: PhoneNumber | null;
	gender: Gender;
	martial_status: string;
	status: string;
	/** date in ISO format */
	date_of_birth: string;
	notes: string;
	blood_type: string;
	disease_type: string;
	email: string;
}

export interface User extends Entity {
	/** datetime */
	last_login: string;
	/** datetime */
	date_joined: string;
	is_superuser: boolean;
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	is_staff: boolean;
	is_active: boolean;
}

export interface Doctor extends Entity {
	full_name: string;
	gender: Gender;
	national_id: string;
	speciality: string;
	license_number: string;
	experience_years: number;
	work_days: string;
	email: string;
	marital_status: string;
	nationality: string;
	user: number;
	notes: string;
	address: Address | null;
	phone: PhoneNumber | null;
	/** date in ISO format */
	date_of_birth: string;
}

export interface Address {
	street: string;
	city: string;
	governorate: string;
}

export interface PhoneNumber {
	mobile: string;
}

export type Gender = "female" | "male";

export interface ImageType extends Entity {
	/** URI of the image */
	image: string;
	user: number;
}

export interface BackendError {
	detail: string;
}
