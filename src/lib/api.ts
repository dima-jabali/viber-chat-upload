import { type Chat, makeChatUuid, makeISODateString } from "#/types/general";
import { FAKE_WORKFLOW_INITIAL_MESSAGES } from "./fake-messages";
import { botUser, user } from "./fake-users";

export const api = Object.freeze({
	get: {
		user: async () => user,

		chats: async () => {
			const chats: Array<Chat> = [
				{
					messages: FAKE_WORKFLOW_INITIAL_MESSAGES,
					title: "Pre-Approved Loan Chatbot",
					createdAt: makeISODateString(),
					description: "Loan Chatbot",
					uuid: makeChatUuid(),
					createdBy: botUser,
				},
			];

			return chats;
		},
	},
});
