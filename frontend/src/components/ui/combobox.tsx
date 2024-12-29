"use client";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Command, CommandList, CommandItem, CommandGroup } from "./command";

export const ComboBox = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedChoice, setSelectedChoice] = useState("");
	const choices = [
		{
			value: "Apartment",
			label: "Apartment",
		},
		{
			value: "House",
			label: "House",
		},
		{
			value: "Townhouse",
			label: "Townhouse",
		},
	];

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" className="w-[200px]">
					{selectedChoice
						? choices.find((choice) => choice.value === selectedChoice)?.label
						: "Choose a unit type"}
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Command>
					<CommandList>
						<CommandGroup>
							{choices.map((choice) => (
								<CommandItem
									key={choice.value}
									value={choice.value}
									onSelect={(selectedValue) => {
										setSelectedChoice(selectedChoice === selectedValue ? "" : selectedValue);
										setIsOpen(false);
									}}
								>
									{choice.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
