import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchInput } from "@/components/ui/searchInput";

export default function Apartment() {
	const currentProximity: [number, number] = [133.4170119, -26.1772288];

	return (
		<>
			<h1 className="text-lg font-bold">Unit details</h1>
			<form>
				<Label htmlFor="search-input">Search an address to start adding a unit</Label>
				<SearchInput proximity={currentProximity} />

				<Label htmlFor="unit-number">Unit number</Label>
				<Input id="unit-number" type="text" placeholder="Unit number" />

				<Label htmlFor="unit-description">Description</Label>
				<Input id="unit-description" type="text" placeholder="Description" />

				<Label htmlFor="cost">Cost per month</Label>
				<Input id="cost" type="number" />

				<Label htmlFor="num-bedrooms">Number of bedrooms</Label>
				<Input id="num-bedrooms" type="number" min={1} max={4} defaultValue={1} />

				<Label htmlFor="num-bathrooms">Number of bathrooms</Label>
				<Input id="num-bathrooms" type="number" min={1} max={4} defaultValue={1} />

				<Label htmlFor="square-footage">Square footage</Label>
				<Input id="square-footage" type="number" />

				<Label htmlFor="lease-term">Lease term</Label>
				<Input id="lease-term" type="number" min={6} max={12} defaultValue={6} />

				<Label htmlFor="deposit">Deposit</Label>
				<Input id="deposit" type="number" />

				<Label htmlFor="is-available">Is the unit available?</Label>
				<Input id="is-available" type="checkbox" />

				<Label htmlFor="available-from">Available from</Label>
				<Input id="available-from" type="date" />

				<Label htmlFor="is-parking">Is parking available?</Label>
				<Input id="is-parking" type="checkbox" />

				<Label htmlFor="is-pet-friendly">Is it pet friendly?</Label>
				<Input id="is-pet-friendly" type="checkbox" />

				<Label htmlFor="is-furnished">Is it furnished?</Label>
				<Input id="is-furnished" type="checkbox" />

				<Label htmlFor="unit-type">Unit type</Label>
				<select id="unit-type">
					<option value="apartment">Apartment</option>
					<option value="house">House</option>
					<option value="townhouse">Townhouse</option>
				</select>
			</form>
		</>
	);
}
