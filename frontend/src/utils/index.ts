export const upperCaseFirst = (value: string): string => {
	return String(value).charAt(0).toLocaleUpperCase() + String(value).slice(1);
};
