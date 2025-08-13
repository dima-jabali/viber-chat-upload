import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function noop() {}

export function log(...params: unknown[]) {
	console.log(params.map(stringifyUnknown).join(" "));
}

export function stringifyUnknown(value: unknown): string {
	if (value instanceof HTMLElement) {
		return value.outerHTML;
	}

	switch (typeof value) {
		case "function":
		case "boolean":
		case "symbol":
		case "bigint":
		case "number":
		case "string":
			return `${value.toString()}`;

		case "object": {
			if (value === null) return "";

			try {
				return JSON.stringify(value, null, 2);
			} catch (error) {
				console.log("Error stringifying object at `stringifyUnknown()`:", {
					error,
					value,
				});

				return "";
			}
		}

		case "undefined":
			return "";
	}
}

export const shortDateFormatter = new Intl.DateTimeFormat(undefined, {
	minute: "numeric",
	hour: "numeric",
	month: "short",
	day: "numeric",
});
