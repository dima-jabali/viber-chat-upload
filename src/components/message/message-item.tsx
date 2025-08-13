import { memo } from "react";

import { DefaultSuspenseAndErrorBoundary } from "#/components/default-suspense-and-error-boundary";
import { type Message, MessageType } from "#/types/general";
import { TextMessage } from "./text";
import { ButtonsMessage } from "./buttons";
import { UploadFilesMessage } from "./upload-files";
import type { GlobalStoreType } from "#/contexts/global-store";

export const MessageItem = memo(function MessageItem({
	globalStore,
	message,
	index,
}: {
	globalStore: GlobalStoreType;
	message: Message;
	index: number;
}) {
	return (
		<DefaultSuspenseAndErrorBoundary
			failedText="Failed to render message!"
			failedClassName="chat-content"
			key={message.uuid}
		>
			{(() => {
				switch (message.type) {
					case MessageType.TEXT:
						return (
							<TextMessage
								globalStore={globalStore}
								message={message}
								index={index}
							/>
						);

					case MessageType.BUTTONS:
						return (
							<ButtonsMessage
								globalStore={globalStore}
								message={message}
								index={index}
							/>
						);

					case MessageType.UPLOAD_FILES:
						return (
							<UploadFilesMessage
								globalStore={globalStore}
								message={message}
								index={index}
							/>
						);

					default:
						console.log("Unknown message type:", message.type, message);

						return null;
				}
			})()}
		</DefaultSuspenseAndErrorBoundary>
	);
});
