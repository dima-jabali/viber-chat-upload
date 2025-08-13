import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import type { GlobalStoreType } from "#/contexts/global-store";
import { cn, shortDateFormatter } from "#/lib/utils";
import type { Message } from "#/types/general";

export function UploadFilesMessage({
	message,
	globalStore,
}: {
	globalStore: GlobalStoreType;
	message: Message;
	index: number;
}) {
	const { formattedDate, imageSource, imageTextFallback, isFromUser } =
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
				{message.text ? <p>{message.text}</p> : null}

				{message.files ? (
					<div className="flex flex-col flex-1 gap-0">
						{message.files.map((file) => {
							return (
								<img
									className="bg-contain"
									src={file.base64}
									key={file.uuid}
									alt=""
								/>
							);
						})}
					</div>
				) : null}

				<p className="text-xs text-muted-foreground">{formattedDate}</p>
			</div>
		</div>
	);
}
