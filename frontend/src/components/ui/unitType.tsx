import Image from "next/image";
import { FormLabel } from "./form";

export const UnitType = ({ onChange }: { onChange: () => void }) => {
	const unitTypes = [
		{
			name: "Apartment",
			description: "A single unit in a building",
			image: "/images/apartment.jpg",
		},
		{
			name: "Condo",
			description: "A single",
			image: "/images/apartment.jpg",
		},
		{
			name: "House",
			description: "A single-family home",
			image: "/images/apartment.jpg",
		},
		{
			name: "Townhouse",
			description: "A single-family home that shares walls with other homes",
			image: "/images/apartment.jpg",
		},
		{
			name: "Duplex",
			description: "A building with two units",
			image: "/images/apartment.jpg",
		},
		{
			name: "Triplex",
			description: "A building with three units",
			image: "/images/apartment.jpg",
		},
		{
			name: "Fourplex",
			description: "A building with four units",
			image: "/images/apartment.jpg",
		},
		{
			name: "Studio",
			description: "A studio room",
			image: "/images/apartment.jpg",
		},
	];

	const list = unitTypes.map((unitType) => {
		return (
			<FormLabel htmlFor={unitType.name} key={unitType.name}>
				<input
					className="hidden"
					type="radio"
					id={unitType.name}
					name="unit_type"
					value={unitType.name.toLowerCase()}
					onChange={onChange}
				/>
				<div className="flex justify-between p-4 border-2 border-solid border-slate-500 rounded">
					<div>
						<h3 className="text-lg">{unitType.name}</h3>
						<p className="text-sm">{unitType.description}</p>
					</div>
					<Image src={unitType.image} alt={unitType.name} width={100} height={100} />
				</div>
			</FormLabel>
		);
	});
	return <div className="flex flex-col gap-2 overflow-scroll h-screen">{list}</div>;
};
