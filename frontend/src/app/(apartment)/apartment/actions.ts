"use server";

export async function addUnit(extraPayload, formData: FormData) {
	const URI = `${process.env.PUBLIC_API_URL}/unit/`;
	const payload = {
		unit_number: formData.get("unit-number"),
		address: {
			name: formData.get("apartment-name"),
			description: extraPayload.description,
			longitude: extraPayload.longitude,
			latitude: extraPayload.latitude,
		},
		is_available: formData.get("is-available") === "on",
		description: formData.get("unit-description"),
		cost_per_month: parseFloat(formData.get("cost") as string),
		number_of_bedrooms: parseInt(formData.get("num-bedrooms") as string),
		number_of_bathrooms: parseInt(formData.get("num-bathrooms") as string),
		square_footage: parseFloat(formData.get("square-footage") as string),
		has_parking: formData.get("is-parking") === "on",
		pet_friendly: formData.get("is-pet-friendly") === "on",
		lease_term: parseInt(formData.get("lease-term") as string),
		security_deposit: parseFloat(formData.get("deposit") as string),
		utilities_included: true,
		furnished: formData.get("is-furnished") === "on",
		available_from: formData.get("available-from"),
		unit_type: formData.get("unit-type"),
	};
	console.log("Payload =>", { payload });
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
