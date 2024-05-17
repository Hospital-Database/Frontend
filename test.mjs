import { z } from "zod";

console.log(
	z
		.object({
			phone: z
				.object({
					mobile: z.preprocess(
						(val) => val || undefined,
						z.string().min(3).optional(),
					),
				})
				.optional(),
		})
		.parse({
			phone: { mobile: "" },
		}),
);
