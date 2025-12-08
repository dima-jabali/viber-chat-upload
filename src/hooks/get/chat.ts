import { useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

import type { Chat, ChatUuid } from "#/types/general";
import { queryKeyFactory } from "../query-keys";

export function useGetChats<Select = Array<Chat>>(
	select?: (data: Array<Chat>) => Select,
) {
	const options = useMemo(
		() => ({
			...queryKeyFactory.get.chats,
			select,
		}),
		[select],
	);

	// @ts-expect-error
	return useSuspenseQuery(options);
}

export function useChat(chatUuid: ChatUuid) {
	const selectChat = useCallback(
		(data: Array<Chat>) => data.find(({ uuid }) => uuid === chatUuid),
		[chatUuid],
	);

	return useGetChats(selectChat).data;
}

export function useMessages(chatUuid: ChatUuid) {
	const selectMessages = useCallback(
		(data: Array<Chat>) => data.find(({ uuid }) => uuid === chatUuid)?.messages,
		[chatUuid],
	);

	return useGetChats(selectMessages).data;
}
