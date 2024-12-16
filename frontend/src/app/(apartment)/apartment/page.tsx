import { SearchInput } from "@/components/ui/searchInput";

export default function Apartment() {
	const currentProximity: [number, number] = [133.4170119, -26.1772288];

	return (
		<>
			<h1>Add an address</h1>
			<SearchInput proximity={currentProximity} />
		</>
	);
}
