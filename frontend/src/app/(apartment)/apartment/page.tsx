"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { SearchInput } from "@/components/ui/searchInput";
import { addUnit } from "./actions";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { defaultFormData, UnitFormData, unitSchema } from "./formSchema";
import { setUnitDetails } from "../../../../features/unit/unitSlice";

export default function Apartment() {
	const dispatch = useAppDispatch();
	const form = useForm<UnitFormData>({
		resolver: zodResolver(unitSchema),
		defaultValues: defaultFormData,
	});
	const currentProximity: [number, number] = [133.4170119, -26.1772288];
	const feature = useAppSelector((state) => state.address.feature) as GeoJSON.Feature<GeoJSON.Point>;
	const { full_address, name_preferred } = feature?.properties || { full_address: "", name_preferred: "" };

	const addUnitWithPayload = addUnit.bind(null, {
		longitude: feature?.geometry.coordinates[0],
		latitude: feature?.geometry.coordinates[1],
		description: `Full address: ${full_address}, Preferred name: ${name_preferred}`,
	});

	const onSubmit = (data: UnitFormData) => {
		const formData = new FormData();

		const safeAppend = (name: string, value: string | Blob | number | boolean | null | undefined) => {
			if (value !== undefined && value !== null) {
				formData.append(name, value.toString());
			}
		};
		safeAppend("unit_type", data["unit_type"]);
		safeAppend("search_input", data["search_input"]);
		safeAppend("unit_number", data["unit_number"]);
		safeAppend("apartment_name", data["apartment_name"]);
		safeAppend("unit_description", data["unit_description"]);
		safeAppend("cost_per_month", data["cost_per_month"]);
		safeAppend("number_of_bedrooms", data["number_of_bedrooms"]);
		safeAppend("number_of_bathrooms", data["number_of_bathrooms"]);
		safeAppend("square_footage", data["square_footage"]);
		safeAppend("lease_term", data["lease_term"]);
		safeAppend("security_deposit", data["security_deposit"]);
		safeAppend("is_available", data["is_available"]);
		safeAppend("available_from", data["available_from"]);
		safeAppend("has_parking", data["has_parking"]);
		safeAppend("pet_friendly", data["pet_friendly"]);
		safeAppend("furnished", data["furnished"]);

		dispatch(setUnitDetails(data));
		addUnitWithPayload(formData);
	};

	return (
		<div className="flex justify-center items-center flex-col">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="search_input"
						render={(props) => {
							const {
								field,
								formState: { errors },
							} = props;

							const error =
								errors.search_input !== undefined ? (
									<p className="text-xs text-red-600">{errors.search_input.message}</p>
								) : null;

							return (
								<FormItem>
									<FormLabel htmlFor="search_input" className="text-sm">
										Search an address
									</FormLabel>
									{error}
									<FormControl>
										<SearchInput proximity={currentProximity} onChange={field.onChange} />
									</FormControl>
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="apartment_name"
						render={({ field, formState: { errors } }) => {
							const error =
								errors.apartment_name !== undefined ? (
									<p className="text-xs text-red-600">{errors.apartment_name.message}</p>
								) : null;

							return (
								<FormItem>
									<FormLabel htmlFor="apartment_name">Does the apartment have a name?</FormLabel>
									{error}
									<FormControl>
										<Input placeholder="Name of the apartment" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="unit_number"
						render={({ field, formState: { errors } }) => {
							const error =
								errors.unit_number !== undefined ? (
									<p className="text-xs text-red-600">{errors.unit_number.message}</p>
								) : null;
							return (
								<FormItem>
									<FormLabel htmlFor="unit_number">Unit number</FormLabel>
									{error}
									<FormControl>
										<Input id="unit_number" placeholder="Unit number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="unit_description"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input placeholder="Description" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="cost_per_month"
						render={({ field, formState: { errors } }) => {
							const error =
								errors.cost_per_month !== undefined ? (
									<p className="text-xs text-red-600">{errors.cost_per_month.message}</p>
								) : null;
							return (
								<FormItem>
									<FormLabel htmlFor="cost_per_month">Cost per month</FormLabel>
									{error}
									<FormControl>
										<Input
											type="number"
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="number_of_bedrooms"
						render={({ field, formState: { errors } }) => {
							const error =
								errors.number_of_bedrooms !== undefined ? (
									<p className="text-xs text-red-600">{errors.number_of_bedrooms.message}</p>
								) : null;
							return (
								<FormItem>
									<FormLabel htmlFor="number_of_bedrooms">Number of bedrooms</FormLabel>
									{error}
									<FormControl>
										<Input
											type="number"
											min={1}
											max={4}
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="number_of_bathrooms"
						render={({ field, formState: { errors } }) => {
							const error =
								errors.number_of_bathrooms !== undefined ? (
									<p className="text-xs text-red-600">{errors.number_of_bathrooms.message}</p>
								) : null;
							return (
								<FormItem>
									<FormLabel htmlFor="number_of_bedrooms">Number of bathrooms</FormLabel>
									{error}
									<FormControl>
										<Input
											type="number"
											min={1}
											max={4}
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="square_footage"
						render={({ field, formState: { errors } }) => {
							const error =
								errors.square_footage !== undefined ? (
									<p className="text-xs text-red-600">{errors.square_footage.message}</p>
								) : null;
							return (
								<FormItem>
									<FormLabel htmlFor="square_footage">Square footage</FormLabel>
									{error}
									<FormControl>
										<Input
											type="number"
											value={field.value ?? ""}
											onChange={(e) => {
												const value = e.target.value;
												field.onChange(value === "" ? null : Number(value));
											}}
											onBlur={field.onBlur}
											name={field.name}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="lease_term"
						render={({ field, formState: { errors } }) => {
							const error =
								errors.lease_term !== undefined ? (
									<p className="text-xs text-red-600">{errors.lease_term.message}</p>
								) : null;
							return (
								<FormItem>
									<FormLabel>Lease term</FormLabel>
									{error}
									<FormControl>
										<Input
											type="number"
											min={6}
											max={12}
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="security_deposit"
						render={({ field, formState: { errors } }) => {
							const error =
								errors.security_deposit !== undefined ? (
									<p className="text-xs text-red-600">{errors.security_deposit.message}</p>
								) : null;
							return (
								<FormItem>
									<FormLabel htmlFor="security_deposit">Deposit</FormLabel>
									{error}
									<FormControl>
										<Input
											type="number"
											value={field.value ?? ""}
											onChange={(e) => {
												const value = e.target.value;
												field.onChange(value === "" ? null : Number(value));
											}}
											onBlur={field.onBlur}
											name={field.name}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="available_from"
						render={({ field, formState: { errors } }) => {
							const error =
								errors.available_from !== undefined ? (
									<p className="text-xs text-red-600">{errors.available_from.message}</p>
								) : null;
							return (
								<FormItem>
									<FormLabel>Available from</FormLabel>
									{error}
									<FormControl>
										<Input
											type="date"
											value={field.value ?? ""} // Convert null/undefined to empty string
											onChange={(e) => {
												const value = e.target.value;
												field.onChange(value === "" ? null : value);
											}}
											onBlur={field.onBlur}
											name={field.name}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="is_available"
						render={({ field, formState: { errors } }) => {
							const error =
								errors.is_available !== undefined ? (
									<p className="text-xs text-red-600">{errors.is_available.message}</p>
								) : null;
							return (
								<FormItem className="flex flex_row items_start space_x_3 space_y_0">
									<FormControl>
										<Checkbox checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
									<FormLabel>Is the unit available?</FormLabel>
									{error}
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="has_parking"
						render={({ field, formState: { errors } }) => {
							const error =
								errors.has_parking !== undefined ? (
									<p className="text-xs text-red-600">{errors.has_parking.message}</p>
								) : null;
							return (
								<FormItem className="flex flex_row items_start space_x_3 space_y_0">
									<FormControl>
										<Checkbox checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
									<FormLabel>Is parking available?</FormLabel>
									{error}
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="pet_friendly"
						render={({ field, formState: { errors } }) => {
							const error =
								errors.pet_friendly !== undefined ? (
									<p className="text-xs text-red-600">{errors.pet_friendly.message}</p>
								) : null;
							return (
								<FormItem className="flex flex_row items_start space_x_3 space_y_0">
									<FormControl>
										<Checkbox checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
									<FormLabel>Is it pet friendly?</FormLabel>
									{error}
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="furnished"
						render={({ field, formState: { errors } }) => {
							const error =
								errors.furnished !== undefined ? (
									<p className="text-xs text-red-600">{errors.furnished.message}</p>
								) : null;
							return (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0">
									<FormControl>
										<Checkbox checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
									<FormLabel>Is it furnished?</FormLabel>
									{error}
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="unit_type"
						render={({ field, formState: { errors } }) => {
							const error =
								errors.unit_type !== undefined ? (
									<p className="text-xs text-red-600">{errors.unit_type.message}</p>
								) : null;
							return (
								<FormItem>
									<FormLabel htmlFor="unit_type">What kind of unit do you have?</FormLabel>
									{error}
									<FormControl>
										<select id="unit_type" {...field}>
											<option value="apartment">Apartment</option>
											<option value="house">House</option>
											<option value="townhouse">Townhouse</option>
											<option value="condo">Condo</option>
											<option value="duplex">Duplex</option>
											<option value="triplex">Triplex</option>
											<option value="fourplex">Fourplex</option>
											<option value="studio">Studio</option>
										</select>
									</FormControl>
								</FormItem>
							);
						}}
					/>
					<Button type="submit">Create entered unit</Button>
				</form>
			</Form>
		</div>
	);
}
