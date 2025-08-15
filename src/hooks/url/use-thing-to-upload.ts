import {
	createParser,
	parseAsString,
	useQueryState,
	type ParserBuilder,
} from "nuqs";

import { Route } from "#/lib/enums";

const ROUTE_ID_KEY = "r";

const parseAsRoute: ParserBuilder<Route> = createParser({
	serialize: (value) => `${value}`,

	parse: (value) => {
		if (!value) return null;

		return parseAsString.parse(value) as Route;
	},
});

export const useRoute = () =>
	useQueryState(
		ROUTE_ID_KEY,
		parseAsRoute.withDefault(Route.ChatApp).withOptions({
			clearOnDefault: false,
			history: "push",
			shallow: true,
		}),
	);
