import { ChevronLeft, ChevronRight, Settings } from "lucide-react";

import { AppSidebar } from "#/components/app-sidebar";
import { EmptyFallbackSuspense } from "#/components/empty-fallback-suspense";
import { MessageInput } from "#/components/message-input";
import { Messages } from "#/components/messages";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Separator } from "#/components/ui/separator";
import { SidebarInset, SidebarProvider } from "#/components/ui/sidebar";
import { WithChatUuid } from "#/components/with-chat-uuid";
import { useGlobalStore } from "#/contexts/global-store";
import { useChat } from "#/hooks/get/chat";
import { useWithChatUuid } from "#/hooks/url/use-chat-uuid";
import { api } from "#/lib/api";
import { useLivenessStore } from "#/contexts/liveness-store";

export function ChatApp() {
	const globalStore = useGlobalStore();

	async function handleResetChat() {
		globalStore.getState().setChats(await api.get.chats());
		useLivenessStore.setState(useLivenessStore.getInitialState());
	}

	return (
		<SidebarProvider>
			<title>Viber</title>

			<AppSidebar />

			<SidebarInset>
				<header className="flex h-10 shrink-0 items-center justify-between gap-2 border-b px-4 py-0">
					<div className="flex items-center gap-2">
						<ChevronLeft className="size-5 stroke-gray-300" />

						<Separator
							className="data-[orientation=vertical]:h-4"
							orientation="vertical"
						/>

						<ChevronRight className="size-5 stroke-gray-300" />
					</div>

					<div className="flex items-center gap-2">
						<button
							className="rounded-full flex items-center bg-accent text-accent-foreground px-2 py-0.5 text-xs button-hover"
							onClick={handleResetChat}
							type="button"
						>
							Viber Out
						</button>

						<button
							className="rounded-full flex items-center justify-center aspect-square h-full button-hover"
							type="button"
						>
							<Settings className="size-4 stroke-muted-foreground" />
						</button>
					</div>
				</header>

				<EmptyFallbackSuspense>
					<WithChatUuid>
						<Chat />
					</WithChatUuid>
				</EmptyFallbackSuspense>
			</SidebarInset>
		</SidebarProvider>
	);
}

function Chat() {
	const chatUuid = useWithChatUuid();
	const chat = useChat(chatUuid);

	return chat ? (
		<section className="flex h-full w-full flex-col gap-0">
			<div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
				<div className="flex items-center gap-2">
					<Avatar className="size-10">
						<AvatarImage src={chat.createdBy.image} alt={chat.createdBy.name} />

						<AvatarFallback>CN</AvatarFallback>
					</Avatar>

					<div className="flex flex-col items-start gap-0 w-full justify-start">
						<span>{chat.title}</span>
					</div>
				</div>
			</div>

			<Messages />

			<MessageInput />
		</section>
	) : null;
}
