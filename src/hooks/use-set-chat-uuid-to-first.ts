import { useQuery } from "@tanstack/react-query";

import { useGetChats } from "./get/chat";
import { useChatUuid } from "./url/use-chat-uuid";

export function useSetChatUuidToFirst() {
	const [chatUuid, setChatUuid] = useChatUuid();
	const chats = useGetChats();

	// console.log({ chatUuid, chats, enabled: chats.data.length > 0 && chatUuid === null });

	useQuery({
		enabled: chats.data.length > 0 && chatUuid !== chats.data[0]?.uuid,
		queryKey: ["chat-uuid-to-first"],
		queryFn: async () => {
			console.log("Setting chat uuid to first", { chats: chats.data });

			await setChatUuid(chats.data[0]?.uuid ?? null);

			return null;
		},
	});
}
