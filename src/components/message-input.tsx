import { Plus, SendHorizonal } from "lucide-react";
import { useEffect, useRef } from "react";

import {
	useForceRenderMessageInput,
	useGlobalStore,
	useWithChatUuid,
} from "#/contexts/global-store";
import { useMessages } from "#/hooks/get/chat";
import { useGetUser } from "#/hooks/get/user";
import { ALL_MESSAGES, CONVERSATION_FLOW } from "#/lib/fake-messages";
import {
	type FileToUpload,
	type Message,
	MessageType,
	makeFileUuid,
	makeISODateString,
	makeMessageUuid,
} from "#/types/general";
import { Input } from "./ui/input";

export function MessageInput() {
	const forceRenderMessageInput = useForceRenderMessageInput();

	return <MessageInput_ key={`${forceRenderMessageInput}`} />;
}

export function MessageInput_() {
	const chatUuid = useWithChatUuid();
	const messages = useMessages(chatUuid);
	const globalStore = useGlobalStore();
	const user = useGetUser();

	const fileInputRef = useRef<HTMLInputElement>(null);
	const inputRef = useRef("");

	function handleOnValueChange(e: React.ChangeEvent<HTMLInputElement>) {
		inputRef.current = e.target.value;
	}

	function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
			handleSend();
		}
	}

	function sendNextBotMsg() {
		const { addMessageToChat, getChatMessages } = globalStore.getState();
		const msgs = getChatMessages(chatUuid);
		const lastMessage = getChatMessages(chatUuid)?.at(-1);

		console.log({
			lastMessage,
			messages,
			txt: inputRef.current,
			CONVERSATION_FLOW,
			ALL_MESSAGES,
		});

		if (inputRef.current) {
			addMessageToChat(chatUuid, {
				createdAt: makeISODateString(),
				uuid: makeMessageUuid(),
				type: MessageType.TEXT,
				text: inputRef.current,
				createdBy: user,
			});
		}

		if (msgs) {
			for (let i = msgs?.length - 1; i >= 0; i--) {
				const msg = msgs[i];

				if (!msg) continue;

				const flow = CONVERSATION_FLOW[msg.uuid];

				if (!flow) {
					console.log("No flow found for message:", {
						CONVERSATION_FLOW,
						msg,
					});

					continue;
				}

				if (flow.botResponse) {
					const botMsg = ALL_MESSAGES[flow.botResponse];

					if (botMsg) {
						setTimeout(() => {
							addMessageToChat(chatUuid, {
								...botMsg,
								createdAt: makeISODateString(),
							});
						}, flow.delay);
					} else {
						console.error("Bot message not found:", { flow, ALL_MESSAGES });
					}
				}

				break;
			}
		}
	}

	function handleSend(msg?: Message) {
		if (!inputRef.current && !msg) return;

		const { addMessageToChat } = globalStore.getState();

		if (msg) {
			addMessageToChat(chatUuid, msg);
			sendNextBotMsg();
		} else {
			sendNextBotMsg();
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

	function handleSelectFile() {
		fileInputRef.current?.click();
	}

	function handleSendFile() {
		const file = fileInputRef.current?.files?.[0];

		if (!file) {
			return;
		}

		const reader = new FileReader();

		reader.onload = () => {
			const image = reader.result as string;

			const fileToUpload: FileToUpload = {
				uuid: makeFileUuid(),
				base64: image,
			};

			handleSend({
				createdAt: makeISODateString(),
				type: MessageType.UPLOAD_FILES,
				uuid: makeMessageUuid(),
				text: inputRef.current,
				files: [fileToUpload],
				createdBy: user,
			});

			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		};

		reader.readAsDataURL(file);
	}

	return (
		<div className="flex items-center gap-2 p-2 border-t border-border">
			<button
				className="flex items-center justify-center aspect-square size-6 button-hover"
				onClick={handleSelectFile}
				type="button"
			>
				<Plus className="size-5 stroke-muted-foreground" />

				<input
					type="file"
					hidden
					accept="image/*"
					multiple={false}
					ref={fileInputRef}
					onChange={handleSendFile}
				/>
			</button>

			<Input
				onChange={handleOnValueChange}
				placeholder="Type message..."
				onKeyDown={handleOnKeyDown}
				className="rounded-full"
			/>

			<button
				className="flex items-center rounded-full justify-center aspect-square size-8 bg-accent button-hover"
				onClick={() => handleSend()}
				type="button"
			>
				<SendHorizonal className="size-4 stroke-white stroke-1" />
			</button>
		</div>
	);
}
