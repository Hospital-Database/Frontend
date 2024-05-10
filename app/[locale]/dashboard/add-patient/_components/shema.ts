import * as z from "zod";
const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5 mega.
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];
export const patientSchema = z.object({
	nationalId: z.string().min(14).max(14),
	fullName: z.string().min(1),
	patientImage: z
		.any()
		.refine(
			(files) => files?.[0]?.size <= MAX_FILE_SIZE,
			"Max image size is 5MB.",
		)
		.refine(
			(files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
			"Only .jpg, .jpeg, .png and .webp formats are supported.",
		)
		.optional(),
	phoneNumber: z.preprocess(
		(val) => val || undefined,
		z.string().min(1).optional(),
	),
	gender: z.literal("male").or(z.literal("female")).optional(),
	martialStatus: z.string().optional(),
	government: z.string().optional(),
	status: z.string().optional(),
	street: z.string().optional(),
	dateOfBirth: z.date().optional(),
	notes: z.preprocess((val) => val || undefined, z.string().min(1).optional()),
});
