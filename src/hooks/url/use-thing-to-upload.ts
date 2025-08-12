import { ThingToUpload } from "#/lib/enums";
import {
	createParser,
	parseAsString,
	useQueryState,
	type ParserBuilder,
} from "nuqs";

const THING_TO_UPLOAD_ID_KEY = "up";

const parseAsThingToUpload: ParserBuilder<ThingToUpload> = createParser({
	serialize: (value) => `${value}`,

	parse: (value) => {
		if (!value) return null;

		return parseAsString.parse(value) as ThingToUpload;
	},
});

export const useThingToUpload = () =>
	useQueryState(
		THING_TO_UPLOAD_ID_KEY,
		parseAsThingToUpload.withDefault(ThingToUpload.ID).withOptions({
			clearOnDefault: false,
			history: "push",
			shallow: true,
		}),
	);
