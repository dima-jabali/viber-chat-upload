import { useRef } from "react";

import { useGlobalStore, useWithChatUuid } from "#/contexts/global-store";
import { useMessages } from "#/hooks/get/chat";
import { AutoScrollIfOnBottom } from "./AutoScrollIfOnBottom";
import { MessageItem } from "./message/message-item";

export function Messages() {
	const chatUuid = useWithChatUuid();
	const messages = useMessages(chatUuid);
	const globalStore = useGlobalStore();

	const scrollRef = useRef<HTMLDivElement>(null);

	globalStore.setState({ chatListRef: scrollRef });

	return (
		<div
			className="flex flex-col overflow-auto h-full max-h-[calc(100vh-155px)] max-w-full whitespace-pre-wrap"
			ref={scrollRef}
		>
			<AutoScrollIfOnBottom scrollParentRef={scrollRef} />

			{messages?.map((message, index) => (
				<MessageItem
					globalStore={globalStore}
					key={message.uuid}
					message={message}
					index={index}
				/>
			))}
		</div>
	);
}
