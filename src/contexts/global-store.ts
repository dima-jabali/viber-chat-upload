import type { QueryClient, Updater } from "@tanstack/react-query";
import { useCallback } from "react";

import { queryKeyFactory } from "#/hooks/query-keys";
import { noop } from "#/lib/utils";
import type { Chat, ChatUuid, Message, UserUuid } from "#/types/general";
import { createZustandProvider } from "./create-zustand-provider";
import { Route } from "#/lib/enums";
import { useSetChatUuidToFirst } from "#/hooks/use-set-chat-uuid-to-first";

type GlobalContextType = {
	invertedIconColor: "white" | "black";
	iconColor: "white" | "black";
	isDarkColorScheme: boolean;

	chatListRef: React.RefObject<HTMLDivElement | null>;
	forceRenderMessageInput: boolean;
	userUuid: UserUuid | null;

	chatUuid: ChatUuid | null;
	route: Route;

	queryClient: QueryClient;

	getChats(): Array<Chat> | undefined;
	setChats(
		newNotebook: Updater<Array<Chat> | undefined, Array<Chat> | undefined>,
	): void;

	getChatMessages(chatUuid: ChatUuid): Array<Message> | undefined;
	addMessageToChat(chatUuid: ChatUuid, message: Message): void;

	handleGoBack(): void;
};

export const {
	useSelectStore: useSelectGlobalStore,
	Provider: GlobalStoreProvider,
	useStore: useGlobalStore,
} = createZustandProvider<GlobalContextType>(
	(get, set) =>
		({
			invertedIconColor: "white",
			isDarkColorScheme: false,
			iconColor: "black",

			chatListRef: { current: null },
			forceRenderMessageInput: true,
			userUuid: null,

			route: Route.ChatApp,
			chatUuid: null,

			// biome-ignore lint/style/noNonNullAssertion: this will be set first thing in the app:
			queryClient: null!,

			getChatMessages(chatUuid) {
				const chats = get().queryClient.getQueryData<Chat[]>(
					queryKeyFactory.get.chats.queryKey,
				);

				if (!chats) return undefined;

				return chats.find((chat) => chat.uuid === chatUuid)?.messages;
			},
			getChats() {
				return get().queryClient.getQueryData(
					queryKeyFactory.get.chats.queryKey,
				);
			},
			setChats(newChats) {
				return get().queryClient.setQueryData(
					queryKeyFactory.get.chats.queryKey,
					newChats,
				);
			},

			addMessageToChat(chatUuid, message) {
				const { setChats, chatListRef } = get();

				setChats((prevChats) => {
					const updatedChats = prevChats?.map((prevChat) => {
						if (prevChat.uuid === chatUuid) {
							const updatedChat: Chat = {
								...prevChat,
								messages: [...prevChat.messages, message],
							};

							return updatedChat;
						}

						return prevChat;
					});

					return updatedChats;
				});

				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						const list = chatListRef.current;

						if (list) {
							list.scrollTop = list.scrollHeight;
						}

						set((prev) => ({
							forceRenderMessageInput: !prev.forceRenderMessageInput,
						}));
					});
				});
			},

			handleGoBack: noop,
		}) satisfies GlobalContextType,
	{
		name: "GlobalStore",
	},
);

export type GlobalStoreType = ReturnType<typeof useGlobalStore>;

const selectForceRenderMessageInput = (state: GlobalContextType) =>
	state.forceRenderMessageInput;
export const useForceRenderMessageInput = () =>
	useSelectGlobalStore(selectForceRenderMessageInput);

const selectIsDarkColorScheme = (state: GlobalContextType) =>
	state.isDarkColorScheme;
export const useIsDarkColorScheme = () =>
	useSelectGlobalStore(selectIsDarkColorScheme);

const selectIconColor = (state: GlobalContextType) => state.iconColor;
export const useIconColor = () => useSelectGlobalStore(selectIconColor);

const selectInvertedIconColor = (state: GlobalContextType) =>
	state.invertedIconColor;
export const useInvertedIconColor = () =>
	useSelectGlobalStore(selectInvertedIconColor);

export const useIsFromUser = (userUuid: UserUuid) => {
	const selectIsFromUser = useCallback(
		(state: GlobalContextType) => state.userUuid === userUuid,
		[userUuid],
	);

	return useSelectGlobalStore(selectIsFromUser);
};

export function useRoute() {
	return useSelectGlobalStore((state) => state.route);
}

export function useChatUuid() {
	return useSelectGlobalStore((state) => state.chatUuid);
}

export function useWithChatUuid() {
	const chatUuid = useChatUuid();

	useSetChatUuidToFirst();

	if (!chatUuid) {
		throw new Error("No chat uuid");
	}

	return chatUuid as ChatUuid;
}
