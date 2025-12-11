import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { useChatUuid, type GlobalStoreType } from "#/contexts/global-store";
import { ALL_MESSAGES } from "#/lib/fake-messages";
import { cn, shortDateFormatter } from "#/lib/utils";
import { type Action, type Message, makeISODateString } from "#/types/general";
import { Check } from "lucide-react";

export function ButtonsMessage({
	globalStore,
	message,
}: {
	globalStore: GlobalStoreType;
	message: Message;
	index: number;
}) {
	const [actionDone, setActionDone] = useState<Action | undefined>(undefined);
	const chatUuid = useChatUuid();

	if (!chatUuid) {
		return null;
	}

	const { formattedDate, imageSource, imageTextFallback, handleOnPress } =
		useState(() => ({
			formattedDate: shortDateFormatter.format(new Date(message.createdAt)),
			imageTextFallback: message.createdBy.name.slice(0, 2),
			imageSource: message.createdBy.image,
			handleOnPress(action: Action) {
				console.log("action");

				setActionDone(action);

				setTimeout(() => {
					const { nextMessageUuid } = action;
					const nextMessage = ALL_MESSAGES[nextMessageUuid];

					if (!nextMessage) {
						console.error("Message not found", {
							ALL_MESSAGES,
							action,
						});

						return;
					}

					globalStore.getState().addMessageToChat(chatUuid, {
						...nextMessage,
						createdAt: makeISODateString(),
					});
				}, 1_500);
			},
		}))[0];

	return (
		<div className="m-4 flex flex-row gap-2">
			<Avatar>
				<AvatarImage src={imageSource} alt={message.createdBy.name} />

				<AvatarFallback className="uppercase text-xs font-bold">
					{imageTextFallback}
				</AvatarFallback>
			</Avatar>

			<div
				className={cn(
					"rounded-2xl w-fit flex flex-col gap-1 max-w-[85%] bg-gray-200 mr-auto rounded-tl-none",
				)}
			>
				{message.text ? (
					typeof message.text === "string" ? (
						<p className="p-3">{message.text}</p>
					) : (
						message.text
					)
				) : null}

				{message.actions ? (
					<div className="flex flex-col flex-1 gap-0">
						{message.actions.map((action, index) => {
							const isThisActionDone = actionDone?.uuid === action.uuid;
							const isSomeOtherActionDone =
								!isThisActionDone && actionDone !== undefined;
							const isLast = index === (message.actions?.length ?? 0) - 1;
							const isOnly = (message.actions?.length ?? 0) === 1;

							return (
								<Button
									className={cn(
										"rounded-md min-h-10 min-w-12 flex-1 active:bg-white/50 hover:bg-white/50 flex flex-row gap-2 items-center justify-center p-3",
										isSomeOtherActionDone && "opacity-10 pointer-events-none",
										isThisActionDone && "opacity-30 pointer-events-none",
										isOnly ? "border-none" : "border-t",
										isLast && !isOnly && "border-b",
									)}
									onClick={() => handleOnPress(action)}
									disabled={actionDone === action}
									key={action.uuid}
									variant="ghost"
								>
									<p className="text-black font-bold underline">
										{action.text}
									</p>

									{isThisActionDone ? <Check size={16} color="black" /> : null}
								</Button>
							);
						})}
					</div>
				) : null}

				<p className="text-xs text-muted-foreground p-3">{formattedDate}</p>
			</div>
		</div>
	);
}
