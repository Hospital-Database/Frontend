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
