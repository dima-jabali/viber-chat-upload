"use client";

import { useEffect } from "react";

import { useGlobalStore, useWithChatUuid } from "#/contexts/global-store";
import { useLivenessStore } from "#/contexts/liveness-store";
import { ALL_MESSAGES, CONVERSATION_FLOW } from "#/lib/fake-messages";
import { makeISODateString } from "#/types/general";

export function CommandOverlay() {
	const { phase, currentCommandIndex, commands, nextCommand, setPhase } =
		useLivenessStore();
	const globalStore = useGlobalStore();
	const chatUuid = useWithChatUuid();

	useEffect(() => {
		if (phase !== "commands") return;

		function sendNextBotMsg() {
			const { addMessageToChat, getChatMessages } = globalStore.getState();
			const lastMessage = getChatMessages(chatUuid)?.at(-1);

			if (lastMessage && CONVERSATION_FLOW[lastMessage.uuid]) {
				const flow = CONVERSATION_FLOW[lastMessage.uuid];

				if (!flow) {
					console.error("No flow found for message:", {
						CONVERSATION_FLOW,
						lastMessage,
					});

					return;
				}

				if (flow.botResponse) {
					const botMsg = ALL_MESSAGES[flow.botResponse];

					if (botMsg) {
						addMessageToChat(chatUuid, {
							...botMsg,
							createdAt: makeISODateString(),
						});
					} else {
						console.error("Bot message not found:", { flow, ALL_MESSAGES });
					}
				}
			}
		}

		const timer = setTimeout(() => {
			if (currentCommandIndex < commands.length - 1) {
				nextCommand();
			} else {
				sendNextBotMsg();

				setTimeout(sendNextBotMsg, 1_500);

				setPhase("liveness-complete");
			}
		}, 3000);

		return () => clearTimeout(timer);
	}, [phase, currentCommandIndex, commands.length, nextCommand, setPhase]);

	return (
		<div className="absolute bottom-3 left-0 right-0 flex flex-col items-center pointer-events-none text-accent text-center">
			{commands[currentCommandIndex]}
		</div>
	);
}
