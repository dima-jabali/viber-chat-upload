import type { Tagged } from "type-fest";

export type ISODateString = Tagged<string, "ISODateString">;
export type MessageUuid = Tagged<string, "MessageUuid">;
export type ActionUuid = Tagged<string, "ActionUuid">;
export type ChatUuid = Tagged<string, "ChatUuid">;
export type UserUuid = Tagged<string, "UserUuid">;
export type FileUuid = Tagged<string, "FileUuid">;

export type User = {
	uuid: UserUuid;
	image: string;
	name: string;
};

export enum MessageType {
	UPLOAD_FILES = "UPLOAD_FILES",
	BUTTONS = "BUTTONS",
	TEXT = "TEXT",
}

export type Action = {
	nextMessageUuid: MessageUuid;
	text: React.ReactNode;
	uuid: ActionUuid;
};

export type FileToUpload = {
	uuid: FileUuid;
	base64: string;
};

export type Message = {
	files?: Array<FileToUpload>;
	createdAt: ISODateString;
	actions?: Array<Action>;
	text: React.ReactNode;
	uuid: MessageUuid;
	type: MessageType;
	createdBy: User;
};

export type Chat = {
	messages: Array<Message>;
	createdAt: ISODateString;
	description: string;
	createdBy: User;
	uuid: ChatUuid;
	title: string;
};

export const makeISODateString = () =>
	new Date().toISOString() as ISODateString;
export const makeMessageUuid = () => crypto.randomUUID() as MessageUuid;
export const makeActionUuid = () => crypto.randomUUID() as ActionUuid;
export const makeUserUuid = () => crypto.randomUUID() as UserUuid;
export const makeChatUuid = () => crypto.randomUUID() as ChatUuid;
export const makeFileUuid = () => crypto.randomUUID() as FileUuid;
