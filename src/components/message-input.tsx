import { Plus, SendHorizonal } from "lucide-react";
import { useEffect, useRef } from "react";

import {
	useForceRenderMessageInput,
	useGlobalStore,
} from "#/contexts/global-store";
import { useMessages } from "#/hooks/get/chat";
import { useGetUser } from "#/hooks/get/user";
import { useWithChatUuid } from "#/hooks/url/use-chat-uuid";
import { Input } from "./ui/input";
import { ALL_MESSAGES, CONVERSATION_FLOW } from "#/lib/fake-messages";
import {
	makeISODateString,
	makeMessageUuid,
	MessageType,
	type MessageUuid,
} from "#/types/general";

export function MessageInput() {
	const forceRenderMessageInput = useForceRenderMessageInput();

	return <MessageInput_ key={`${forceRenderMessageInput}`} />;
}

export function MessageInput_() {
	const chatUuid = useWithChatUuid();
	const messages = useMessages(chatUuid);
	const globalStore = useGlobalStore();
	const user = useGetUser();

	const inputRef = useRef("");

	function handleOnValueChange(e: React.ChangeEvent<HTMLInputElement>) {
		inputRef.current = e.target.value;
	}

	function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
			handleSend();
		}
	}

	function handleSend() {
		const { addMessageToChat } = globalStore.getState();
		const lastMessage = messages?.at(-1);

		console.log({
			lastMessage,
			messages,
			txt: inputRef.current,
			CONVERSATION_FLOW,
			ALL_MESSAGES,
		});

		if (lastMessage && CONVERSATION_FLOW[lastMessage.uuid]) {
			const flow = CONVERSATION_FLOW[lastMessage.uuid];

			if (!flow) {
				console.error("No flow found for message:", {
					CONVERSATION_FLOW,
					lastMessage,
				});

				return;
			}

			let userMessageText = "";

			if (flow.userResponse === "text-input") {
				userMessageText = inputRef.current;
			} else if (flow.userResponse === "text-input-loyalty-card") {
				userMessageText = "1234567890"; // Mocking the loyalty card number
			} else if (flow.userResponse) {
				// Find the full message object from our mock database
				const userMsg = ALL_MESSAGES[flow.userResponse as MessageUuid];

				if (userMsg) {
					addMessageToChat(chatUuid, {
						...userMsg,
						createdAt: makeISODateString(),
					});
				} else {
					console.error("User message not found:", {
						ALL_MESSAGES,
						flow,
					});
				}
			}

			// Add user-typed message if it's a 'text-input' flow
			if (userMessageText) {
				addMessageToChat(chatUuid, {
					createdAt: makeISODateString(),
					uuid: makeMessageUuid(),
					type: MessageType.TEXT,
					text: userMessageText,
					createdBy: user,
				});
			}

			// Add the bot's response after a delay
			if (flow.botResponse) {
				setTimeout(() => {
					const botMsg = ALL_MESSAGES[flow.botResponse];

					if (botMsg) {
						addMessageToChat(chatUuid, {
							...botMsg,
							createdAt: makeISODateString(),
						});
					} else {
						console.error("Bot message not found:", { flow, ALL_MESSAGES });
					}
				}, flow.delay);
			}
		} else {
			// Default case: just send the user's message
			const text = inputRef.current;

			if (!text) {
				console.log("No text. Not sending.");

				return;
			}

			addMessageToChat(chatUuid, {
				createdAt: makeISODateString(),
				uuid: makeMessageUuid(),
				type: MessageType.TEXT,
				createdBy: user,
				text,
			});
		}
	}

	const handleSendRef = useRef(handleSend);

	handleSendRef.current = handleSend;

	const lastVisibilityState = useRef(document.visibilityState);

	useEffect(() => {
		const handleVisibilityChange = () => {
			const currentVisibilityState = document.visibilityState;
			if (
				lastVisibilityState.current === "hidden" &&
				currentVisibilityState === "visible"
			) {
				// This code will run when the tab becomes visible again
				console.log("Web page has returned to the foreground!");

				handleSendRef.current();
			}

			lastVisibilityState.current = currentVisibilityState;
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	return (
		<div className="flex items-center gap-2 p-2 border-t border-border">
			<button
				className="flex items-center justify-center aspect-square size-6 button-hover"
				type="button"
			>
				<Plus className="size-5 stroke-muted-foreground" />
			</button>

			<Input
				onChange={handleOnValueChange}
				placeholder="Type message..."
				onKeyDown={handleOnKeyDown}
				className="rounded-full"
			/>

			<button
				className="flex items-center rounded-full justify-center aspect-square size-8 bg-accent button-hover"
				onClick={handleSend}
				type="button"
			>
				<SendHorizonal className="size-4 stroke-white stroke-1" />
			</button>
		</div>
	);
}
