import Image from "next/image";
import Link from "next/link";
import { useUnitListQuery } from "../../../features/api/apiSlice";
import { BedSingle, BedDouble, CarFront, Bath } from "lucide-react";
import { upperCaseFirst } from "@/utils";
import { Card, CardContent, CardTitle, CardDescription } from "./card";

export const UnitList = () => {
	const { data: units, isLoading } = useUnitListQuery();

	return (
		<>
			{units?.features.map((feature) => {
				if (units.type === "FeatureCollection") {
					if (feature.properties) {
						const {
							is_available,
							number_of_bedrooms,
							number_of_bathrooms,
							has_parking,
							cost_per_month,
							unit_type,
							address,
						} = feature.properties;
						return (
							<Link key={feature.id} href={`/details/${feature.id}`}>
								<Card>
									<div className="relative">
										<Image
											src="/images/apartment.jpg"
											alt={address.properties.name}
											width={300}
											height={300}
											className="w-full h-full rounded-t-xl"
										/>
										<div
											className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent rounded-t-xl"
											style={{ pointerEvents: "none" }}
										/>
									</div>
									<div className="flex flex-col pl-2 pr-2 pb-2 pt-2 gap-2">
										<CardTitle>
											<p className="text-sm">${cost_per_month}</p>
											<h1 className="text-xs">{address.properties.name}</h1>
											{is_available ? <p className="text-xs">Available for inspection</p> : null}
										</CardTitle>
										<CardDescription>
											<div className="flex flex-row gap-1 overflow-hidden">
												{number_of_bedrooms > 1 ? (
													<span className="flex flex-row items-center gap-1">
														<BedDouble className="w-3 h-w-3 sm:w-4 sm:h-4" />
														<p className="text-sm">{number_of_bedrooms}</p>
													</span>
												) : (
													<span className="flex flex-row items-center gap-1">
														<BedSingle className="w-3 h-w-3 sm:w-4 sm:h-4" />
														<p className="text-sm">{number_of_bedrooms}</p>
													</span>
												)}

												{number_of_bathrooms ? (
													<span className="flex flex-row items-center gap-1">
														<Bath className="w-3 h-w-3 sm:w-4 sm:h-4" />
														<p className="text-sm">{number_of_bathrooms}</p>
													</span>
												) : null}

												{has_parking ? (
													<span className="flex flex-row items-center gap-1">
														<CarFront className="w-3 h-w-3 sm:w-4 sm:h-4" />
														<p className="text-sm">{1}</p>
													</span>
												) : null}

												<span className="flex flex-row items-center gap-1">
													<p className="text-sm">{upperCaseFirst(unit_type)}</p>
												</span>
											</div>
										</CardDescription>
									</div>
								</Card>
							</Link>
						);
					}
				}
			})}
		</>
	);
};
