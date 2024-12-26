import * as z from "zod";

const unitTypeEnum = ["apartment", "house", "studio", "townhouse"] as const;

export const unitSchema = z.object({
	unit_number: z.string().max(50, "Unit number cannot exceed 50 characters"),
	apartment_name: z.string().nonempty("Apartment name is required"),
	search_input: z.string().nonempty("Search input is required"),

	is_available: z.boolean().default(true),
	unit_description: z.string().optional(),

	cost_per_month: z
		.number()
		.positive("Cost must be greater than 0")
		.multipleOf(0.01, "Cost must have at most 2 decimal places")
		.max(9999999.99, "Cost cannot exceed 10 digits including decimals"),

	number_of_bedrooms: z.number().int("Must be a whole number").min(1, "Must have at least 1 bedroom").default(1),

	number_of_bathrooms: z.number().int("Must be a whole number").min(1, "Must have at least 1 bathroom").default(1),

	square_footage: z
		.number()
		.positive("Square footage must be greater than 0")
		.multipleOf(0.01, "Square footage must have at most 2 decimal places")
		.max(9999999.99, "Square footage cannot exceed 10 digits including decimals")
		.nullable()
		.optional(),

	has_parking: z.boolean().default(false),
	pet_friendly: z.boolean().default(false),

	lease_term: z.number().int("Must be a whole number").min(1, "Lease term must be at least 1 month").default(12),

	security_deposit: z
		.number()
		.positive("Security deposit must be greater than 0")
		.multipleOf(0.01, "Security deposit must have at most 2 decimal places")
		.max(9999999.99, "Security deposit cannot exceed 10 digits including decimals")
		.nullable()
		.optional(),

	utilities_included: z.boolean().default(false),
	furnished: z.boolean().default(false),

	available_from: z
		.string()
		.refine((date) => !isNaN(Date.parse(date)), {
			message: "Invalid date format",
		})
		.nullable()
		.optional(),

	unit_type: z.enum(unitTypeEnum).default("apartment"),
});

// Type inference
export type UnitFormData = z.infer<typeof unitSchema>;
