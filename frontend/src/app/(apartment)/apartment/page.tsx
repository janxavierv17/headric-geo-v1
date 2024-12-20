"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchInput } from "@/components/ui/searchInput";
import { addUnit } from "./actions";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "../../../../lib/hooks";

export default function Apartment() {
	const currentProximity: [number, number] = [133.4170119, -26.1772288];
	const feature = useAppSelector((state) => state.address.feature) as GeoJSON.Feature<GeoJSON.Point>;
	const { full_address, name_preferred } = feature.properties || { full_address: "", name_preferred: "" };

	const addUnitWithPayload = addUnit.bind(null, {
		longitude: feature.geometry.coordinates[0],
		latitude: feature.geometry.coordinates[1],
		description: `Full address: ${full_address}, Preferred name: ${name_preferred}`,
	});

	return (
		<>
			<h1 className="text-lg font-bold">Unit details</h1>
			<form action={addUnitWithPayload}>
				<Label htmlFor="search-input">Search an address to start adding a unit</Label>
				<SearchInput proximity={currentProximity} />

				<Label htmlFor="apartment-name">Does the apartment have a name?</Label>
				<Input id="apartment-name" name="apartment-name" type="text" placeholder="Name of the apartment" />

				<Label htmlFor="unit-number">Unit number</Label>
				<Input id="unit-number" name="unit-number" type="text" placeholder="Unit number" />

				<Label htmlFor="unit-description">Description</Label>
				<Input id="unit-description" name="unit-description" type="text" placeholder="Description" />

				<Label htmlFor="cost">Cost per month</Label>
				<Input id="cost" name="cost" type="number" />

				<Label htmlFor="num-bedrooms">Number of bedrooms</Label>
				<Input id="num-bedrooms" name="num-bedrooms" type="number" min={1} max={4} defaultValue={1} />

				<Label htmlFor="num-bathrooms">Number of bathrooms</Label>
				<Input id="num-bathrooms" name="num-bathrooms" type="number" min={1} max={4} defaultValue={1} />

				<Label htmlFor="square-footage">Square footage</Label>
				<Input id="square-footage" name="square-footage" type="number" />

				<Label htmlFor="lease-term">Lease term</Label>
				<Input id="lease-term" name="lease-term" type="number" min={6} max={12} defaultValue={6} />

				<Label htmlFor="deposit">Deposit</Label>
				<Input id="deposit" name="deposti" type="number" />

				<Label htmlFor="is-available">Is the unit available?</Label>
				<Input id="is-available" name="is-available" type="checkbox" />

				<Label htmlFor="available-from">Available from</Label>
				<Input id="available-from" name="available-from" type="date" />

				<Label htmlFor="is-parking">Is parking available?</Label>
				<Input id="is-parking" name="is-parking" type="checkbox" />

				<Label htmlFor="is-pet-friendly">Is it pet friendly?</Label>
				<Input id="is-pet-friendly" name="is-pet-friendly" type="checkbox" />

				<Label htmlFor="is-furnished">Is it furnished?</Label>
				<Input id="is-furnished" name="is-furnished" type="checkbox" />

				<Label htmlFor="unit-type">Unit type</Label>
				<select id="unit-type" name="unit-type">
					<option value="apartment">Apartment</option>
					<option value="house">House</option>
					<option value="townhouse">Townhouse</option>
				</select>

				<Button type="submit">Create entered unit</Button>
			</form>
		</>
	);
}
