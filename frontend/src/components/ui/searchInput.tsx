"use client";

import { useEffect, useRef, useState } from "react";
import { retrieveGeoCode, searchAndSuggestions } from "../../../lib/mapbox/actions";
import { Input } from "./input";
import { Mapbox_id, Mapbox_name, MapboxSuggestions } from "../../../lib/mapbox/types";
import { useAppDispatch } from "../../../lib/hooks";
import { feature } from "../../../features/address/addressSlice";

export const SearchInput = ({ proximity }: { proximity: [number, number] | null }) => {
	const [searchText, setSearchText] = useState("");
	const [debouncedSearchText, setDebouncedSearchText] = useState("");
	const [searchTextSuggestions, setSearchTextSuggestions] = useState<MapboxSuggestions>();
	const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const suggestionsRef = useRef<HTMLUListElement>(null);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			setDebouncedSearchText(searchText);
		}, 1000);

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [searchText]);

	useEffect(() => {
		const fetchGeo = async () => {
			if (debouncedSearchText && proximity) {
				const data = await searchAndSuggestions(debouncedSearchText, proximity);
				setSearchTextSuggestions(data);
			}
		};

		fetchGeo();
	}, [debouncedSearchText, proximity]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value);
		setHighlightedIndex(-1);
		setIsDropdownOpen(true);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (!searchTextSuggestions?.suggestions) return;

		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				setHighlightedIndex((prev) => (prev < searchTextSuggestions.suggestions.length - 1 ? prev + 1 : 0));
				break;

			case "ArrowUp":
				event.preventDefault();
				setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : searchTextSuggestions.suggestions.length - 1));
				break;

			case "Enter":
				event.preventDefault();
				if (highlightedIndex >= 0) {
					setSearchText(searchTextSuggestions.suggestions[highlightedIndex].name);
					setIsDropdownOpen(false);
				}
				break;

			case "Escape":
				setIsDropdownOpen(false);
				break;
		}
	};

	const handleSuggestionClick = async (name: Mapbox_name, mapbox_id: Mapbox_id) => {
		setSearchText(name);
		setIsDropdownOpen(false);
		inputRef.current?.focus();
		dispatch(feature(await retrieveGeoCode(mapbox_id)));
	};

	const handleOnInput = () => {
		setSearchText("");
		setDebouncedSearchText("");
		setIsDropdownOpen(false);
		setSearchTextSuggestions(undefined);
	};

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
				type="search"
				placeholder="Search"
				className="w-full bg-white"
				aria-autocomplete="list"
				aria-controls="suggestions-list"
				ref={inputRef}
				value={searchText}
				onKeyDown={handleKeyDown}
				onChange={handleSearchChange}
				onInput={handleOnInput}
			/>

			<div role="status" aria-live="polite" className="sr-only">
				{searchTextSuggestions?.suggestions
					? `${searchTextSuggestions.suggestions.length} suggestions available.`
					: debouncedSearchText
					? "No suggestions found."
					: ""}
			</div>

			{isDropdownOpen && searchTextSuggestions?.suggestions && (
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
			)}
		</div>
	);
};
