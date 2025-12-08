import {
	type SingleParserBuilder,
	type UseQueryStateReturn,
	createParser,
	parseAsString,
	useQueryState
} from "nuqs";

import type { ChatUuid } from "#/types/general";
import { useSetChatUuidToFirst } from "../use-set-chat-uuid-to-first";

const CHAT_UUID_ID_KEY = "chat-uuid";

const parseAsChatUuid: SingleParserBuilder<ChatUuid> = createParser({
	serialize: (value) => `${value}`,

	parse: (value) => {
		if (!value) return null;

		return parseAsString.parse(value) as ChatUuid;
	},
});

export const useChatUuid = () =>
	useQueryState<ChatUuid>(
		CHAT_UUID_ID_KEY,
		parseAsChatUuid.withOptions({
			clearOnDefault: false,
			history: "push",
			shallow: true,
		}),
	) as UseQueryStateReturn<ChatUuid, undefined>;

export function useWithChatUuid() {
	const [chatUuid] = useChatUuid();

	useSetChatUuidToFirst();

	if (!chatUuid) {
		throw new Error("No chat uuid");
	}

	return chatUuid as ChatUuid;
}
