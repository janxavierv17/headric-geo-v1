"use server";

export async function addUnit(extraPayload, formData: FormData) {
	const URI = `${process.env.PUBLIC_API_URL}/unit/`;
	const payload = {
		unit_number: formData.get("unit_number"),
		address: {
			name: formData.get("apartment_name"),
			description: extraPayload.description,
			longitude: extraPayload.longitude,
			latitude: extraPayload.latitude,
		},
		is_available: formData.get("is_available"),
		description: formData.get("unit_description"),
		cost_per_month: parseFloat(formData.get("cost_per_month") as string),
		number_of_bedrooms: parseInt(formData.get("number_of_bedrooms") as string),
		number_of_bathrooms: parseInt(formData.get("number_of_bathrooms") as string),
		square_footage: parseFloat(formData.get("square_footage") as string),
		has_parking: formData.get("is_parking"),
		pet_friendly: formData.get("is_pet_friendly"),
		lease_term: parseInt(formData.get("lease_term") as string),
		security_deposit: parseFloat(formData.get("security_deposit") as string),
		utilities_included: true,
		furnished: formData.get("furnished"),
		available_from: formData.get("available_from"),
		unit_type: formData.get("unit_type"),
	};
	const response = await fetch(URI, {
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
		method: "POST",
	});

	if (response.ok) {
		console.log("Unit added successfully");
	} else {
		console.error("Failed to add unit", await response.json());
	}
}
