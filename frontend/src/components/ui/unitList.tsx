import Image from "next/image";
import Link from "next/link";

export const UnitList = ({
	units,
	isLoading,
}: {
	units: GeoJSON.FeatureCollection | undefined;
	isLoading: boolean;
}) => {
	if (isLoading) return null;

	return (
		<>
			{units?.features.map((feature) => {
				if (units.type === "FeatureCollection")
					return (
						<Link key={feature.id} href={`/details/${feature.id}`}>
							<div className="flex flex-col-reverse">
								<h1 className="text-sm">{feature.properties?.name}</h1>
								<Image
									src="/images/apartment.jpg"
									alt={feature.properties?.name}
									width={300}
									height={300}
									style={{ height: "100%", width: "100%" }}
								/>
							</div>
						</Link>
					);
			})}
		</>
	);
};
