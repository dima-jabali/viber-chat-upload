import { CheckCheck } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import type { GlobalStoreType } from "#/contexts/global-store";
import { cn, shortDateFormatter } from "#/lib/utils";
import type { Message } from "#/types/general";

export function TextMessage({
	globalStore,
	message,
}: {
	globalStore: GlobalStoreType;
	message: Message;
	index: number;
}) {
	const { formattedDate, isFromUser, imageSource, imageTextFallback } =
		useState(() => ({
			isFromUser: globalStore.getState().userUuid === message.createdBy.uuid,
			formattedDate: shortDateFormatter.format(new Date(message.createdAt)),
			imageTextFallback: message.createdBy.name.slice(0, 2),
			imageSource: message.createdBy.image,
		}))[0];

	return (
		<div className="m-4 flex flex-row gap-2">
			{isFromUser ? null : (
				<Avatar>
					<AvatarImage src={imageSource} alt={message.createdBy.name} />

					<AvatarFallback className="uppercase text-xs font-bold">
						{imageTextFallback}
					</AvatarFallback>
				</Avatar>
			)}

			<div
				className={cn(
					"p-3 rounded-2xl w-fit flex flex-col gap-1 max-w-[85%]",
					isFromUser
						? "bg-blue-50 ml-auto rounded-tr-none"
						: "bg-gray-200 mr-auto rounded-tl-none",
				)}
			>
				{typeof message.text === "string" ? (
					<p>{message.text}</p>
				) : (
					message.text
				)}

				{isFromUser ? (
					<div className="flex flex-row items-center justify-between gap-2">
						<p className="text-xs text-muted-foreground">{formattedDate}</p>

						<CheckCheck size={16} strokeWidth={1.5} className="stroke-accent" />
					</div>
				) : (
					<p className="text-xs text-muted-foreground">{formattedDate}</p>
				)}
			</div>
		</div>
	);
}
