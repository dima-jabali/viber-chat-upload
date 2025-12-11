import { useChatUuid } from "#/contexts/global-store";
import { useSetChatUuidToFirst } from "#/hooks/use-set-chat-uuid-to-first";

export function WithChatUuid({ children }: { children: React.ReactNode }) {
	const chatUuid = useChatUuid();

	useSetChatUuidToFirst();

	return chatUuid === null ? null : children;
}
