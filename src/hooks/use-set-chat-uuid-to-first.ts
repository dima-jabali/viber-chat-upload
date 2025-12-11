import { useQuery } from "@tanstack/react-query";

import { useGetChats } from "./get/chat";
import { useChatUuid, useGlobalStore } from "#/contexts/global-store";

export function useSetChatUuidToFirst() {
	const globalStore = useGlobalStore();
	const chatUuid = useChatUuid();
	const chats = useGetChats();

	// console.log({ chatUuid, chats, enabled: chats.data.length > 0 && chatUuid === null });

	useQuery({
		enabled: chats.data.length > 0 && chatUuid !== chats.data[0]?.uuid,
		queryKey: ["chat-uuid-to-first"],
		queryFn: async () => {
			console.log("Setting chat uuid to first", { chats: chats.data });

			globalStore.setState({chatUuid:chats.data[0]?.uuid ?? null});

			return null;
		},
	});
}
