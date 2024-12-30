"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { retrieveGeoCode, searchAndSuggestions } from "../../../lib/mapbox/actions";
import { Input } from "./input";
import { Mapbox_id, Mapbox_name, MapboxSuggestions } from "../../../lib/mapbox/types";
import { useAppDispatch } from "../../../lib/hooks";
import { feature } from "../../../features/address/addressSlice";

export const SearchInput = ({
	proximity,
	onChange,
}: {
	proximity: [number, number] | null;
	onChange: (value: string) => void;
}) => {
	const [searchText, setSearchText] = useState("");
	const [debouncedSearchText, setDebouncedSearchText] = useState("");
	const [searchTextSuggestions, setSearchTextSuggestions] = useState<MapboxSuggestions>();
	const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const suggestionsRef = useRef<HTMLUListElement>(null);

	const dispatch = useAppDispatch();

	const handleSearchChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			setSearchText(value);
			setHighlightedIndex(-1);
			setIsDropdownOpen(true);
			setIsSuggestionSelected(false);
			onChange(value);
		},
		[onChange]
	);

	const handleSuggestionClick = useCallback(
		async (name: Mapbox_name, mapbox_id: Mapbox_id) => {
			setIsSuggestionSelected(true);
			setSearchText(name);
			setIsDropdownOpen(false);
			setSearchTextSuggestions(undefined);
			inputRef.current?.focus();
			const geoCode = await retrieveGeoCode(mapbox_id);
			dispatch(feature(geoCode));
		},
		[dispatch]
	);

	const handleOnInput = useCallback(() => {
		setSearchText("");
		setDebouncedSearchText("");
		setIsDropdownOpen(false);
		setSearchTextSuggestions(undefined);
		setIsSuggestionSelected(false);
	}, []);

	useEffect(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		// Don't set up new timeout if a suggestion was selected
		if (!isSuggestionSelected) {
			timeoutRef.current = setTimeout(() => {
				setDebouncedSearchText(searchText);
			}, 1000);
		}

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [searchText, isSuggestionSelected]);

	useEffect(() => {
		const fetchGeo = async () => {
			if (debouncedSearchText && proximity && !isSuggestionSelected) {
				console.log("Fetching addresses =>");
				const data = await searchAndSuggestions(debouncedSearchText, proximity);
				setSearchTextSuggestions(data);
			}
		};

		fetchGeo();
	}, [debouncedSearchText, proximity, isSuggestionSelected]);

	const suggestionsList = useMemo(() => {
		if (!isDropdownOpen || !searchTextSuggestions?.suggestions) return null;

		return (
			<ul
				id="suggestions-list"
				className="absolute mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-50"
				role="listbox"
				ref={suggestionsRef}
			>
				{searchTextSuggestions.suggestions.map((suggestion, index) => (
					<li
						key={suggestion.mapbox_id}
						className={`px-4 py-2 cursor-pointer ${index === highlightedIndex ? "bg-gray-200" : ""}`}
						role="option"
						aria-selected={index === highlightedIndex}
						onClick={() => handleSuggestionClick(suggestion.name, suggestion.mapbox_id)}
					>
						<p className="text-base">{suggestion.name}</p>
						<p className="text-sm">{suggestion.full_address}</p>
					</li>
				))}
			</ul>
		);
	}, [isDropdownOpen, searchTextSuggestions, highlightedIndex, handleSuggestionClick]);

	return (
		<div
			className="relative"
			role="combobox"
			aria-expanded={isDropdownOpen}
			aria-haspopup="listbox"
			aria-controls="suggestions-list"
		>
			<label htmlFor="search-input" className="sr-only">
				Search
			</label>
			<Input
				id="search-input"
				name="search-input"
				type="search"
				placeholder="Search"
				className="w-full bg-white"
				aria-autocomplete="list"
				aria-controls="suggestions-list"
				ref={inputRef}
				value={searchText}
				onChange={handleSearchChange}
				onInput={handleOnInput}
			/>

			<div role="status" aria-live="polite" className="sr-only">
				{searchTextSuggestions?.suggestions
					? `${searchTextSuggestions.suggestions.length} suggestions available.`
					: debouncedSearchText && !isSuggestionSelected
					? "No suggestions found."
					: ""}
			</div>

			{suggestionsList}
		</div>
	);
};
