import {
	type Message,
	MessageType,
	type MessageUuid,
	makeActionUuid,
	makeFileUuid,
	makeISODateString,
	makeMessageUuid,
} from "#/types/general";
import { Route } from "./enums";
import { botUser, user } from "./fake-users";
import { idFront } from "./id-front";

const BASE_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000/?r="
		: "https://viber-chat-upload.vercel.app/?r=";

export const MISSING_LOYALTY_CARD_USER_MESSAGE_UUID = makeMessageUuid();
export const MISSING_LOYALTY_CARD_BOT_MESSAGE_UUID = makeMessageUuid();
export const ID_PARSING_CONFIRMATION_MESSAGE_UUID = makeMessageUuid();
export const LOAN_AGREEMENT_CONSENT_MESSAGE_UUID = makeMessageUuid();
export const ID_VERIFICATION_MATCH_MESSAGE_UUID = makeMessageUuid();
export const APPROVAL_DISBURSEMENT_MESSAGE_UUID = makeMessageUuid();
export const CONFIRM_BANK_INFO_BOT_MESSAGE_UUID = makeMessageUuid();
export const USER_UPLOAD_ID_MESSAGE_UUID_SECOND = makeMessageUuid();
export const USER_UPLOAD_ID_MESSAGE_UUID_FIRST = makeMessageUuid();
export const UPLOAD_LOYALTY_CARD_MESSAGE_UUID = makeMessageUuid();
export const COLLECT_BANK_INFO_MESSAGE_UUID = makeMessageUuid();
export const SEND_BANK_INFO_MESSAGE_UUID = makeMessageUuid();
export const BOT_UPLOAD_ID_MESSAGE_UUID = makeMessageUuid();
export const CORRECT_NAME_MESSAGE_UUID = makeMessageUuid();
export const BLURRY_ID_MESSAGE_UUID = makeMessageUuid();

function handleMakeLink(url: Route) {
	const link = `${BASE_URL}${encodeURI(url)}`;

	return link;
}

export const ALL_MESSAGES: Record<MessageUuid, Message> = {
	[BOT_UPLOAD_ID_MESSAGE_UUID]: {
		text: "Please upload a clear photo of your government ID (front).",
		createdAt: makeISODateString(),
		uuid: BOT_UPLOAD_ID_MESSAGE_UUID,
		type: MessageType.TEXT,
		createdBy: botUser,
	},
	[USER_UPLOAD_ID_MESSAGE_UUID_FIRST]: {
		files: [{ base64: idFront, uuid: makeFileUuid() }],
		uuid: USER_UPLOAD_ID_MESSAGE_UUID_FIRST,
		createdAt: makeISODateString(),
		type: MessageType.UPLOAD_FILES,
		createdBy: user,
		text: "",
	},
	[BLURRY_ID_MESSAGE_UUID]: {
		text: "Hmm, I couldn't read that clearly. Could you retake the photo?\n\nTip: Hold your phone steady and avoid glare.",
		createdAt: makeISODateString(),
		uuid: BLURRY_ID_MESSAGE_UUID,
		type: MessageType.TEXT,
		createdBy: botUser,
	},
	[USER_UPLOAD_ID_MESSAGE_UUID_SECOND]: {
		files: [{ base64: idFront, uuid: makeFileUuid() }],
		uuid: USER_UPLOAD_ID_MESSAGE_UUID_SECOND,
		createdAt: makeISODateString(),
		type: MessageType.UPLOAD_FILES,
		createdBy: user,
		text: "",
	},
	[ID_PARSING_CONFIRMATION_MESSAGE_UUID]: {
		actions: [
			{
				nextMessageUuid: ID_VERIFICATION_MATCH_MESSAGE_UUID,
				uuid: makeActionUuid(),
				text: "Yes, it is",
			},
			{
				nextMessageUuid: CORRECT_NAME_MESSAGE_UUID,
				uuid: makeActionUuid(),
				text: "No, edit",
			},
		],
		text: "📄 Got it! I see:\n\n\t• Name: Juan Dela Cruz\n\t• DOB: 05/15/1990\n\t• Address: 123 Mabini St., Manila\n\nIs this correct?",
		uuid: ID_PARSING_CONFIRMATION_MESSAGE_UUID,
		createdAt: makeISODateString(),
		type: MessageType.BUTTONS,
		createdBy: botUser,
	},
	[CORRECT_NAME_MESSAGE_UUID]: {
		text: "Please type your full legal name exactly as it appears on your ID.",
		uuid: CORRECT_NAME_MESSAGE_UUID,
		createdAt: makeISODateString(),
		type: MessageType.TEXT,
		createdBy: botUser,
	},
	[ID_VERIFICATION_MATCH_MESSAGE_UUID]: {
		text: "Verifying your details…\n\n✅ Great news, Juan! You're pre-approved for ₱50,000 at 1.5% monthly, payable in 12 months.\n\nPlease upload a photo of your PartnerMart loyalty card if you have it with you:",
		uuid: ID_VERIFICATION_MATCH_MESSAGE_UUID,
		createdAt: makeISODateString(),
		type: MessageType.TEXT,
		createdBy: botUser,
	},
	[MISSING_LOYALTY_CARD_USER_MESSAGE_UUID]: {
		uuid: MISSING_LOYALTY_CARD_USER_MESSAGE_UUID,
		text: "I don't have it with me.",
		createdAt: makeISODateString(),
		type: MessageType.TEXT,
		createdBy: user,
	},
	[MISSING_LOYALTY_CARD_BOT_MESSAGE_UUID]: {
		text: "No problem! Please enter your loyalty ID number or mobile number registered with PartnerMart.",
		uuid: MISSING_LOYALTY_CARD_BOT_MESSAGE_UUID,
		createdAt: makeISODateString(),
		type: MessageType.TEXT,
		createdBy: botUser,
	},
	[COLLECT_BANK_INFO_MESSAGE_UUID]: {
		text: "Alright. Now, please provide the following details to process your loan payout:\n\n\t• Full Name:\n\t• Account Number:\n\t• Bank Name:\n\t• Routing Number (ABA):",
		uuid: COLLECT_BANK_INFO_MESSAGE_UUID,
		createdAt: makeISODateString(),
		type: MessageType.TEXT,
		createdBy: botUser,
	},
	[SEND_BANK_INFO_MESSAGE_UUID]: {
		text: "Full Name: Juan Dela Cruz\nAccount Number: 123456789\nBank Name: The Philippine Bank of Communications\nRouting Number (ABA): 987654321",
		uuid: SEND_BANK_INFO_MESSAGE_UUID,
		createdAt: makeISODateString(),
		type: MessageType.TEXT,
		createdBy: user,
	},
	[CONFIRM_BANK_INFO_BOT_MESSAGE_UUID]: {
		actions: [
			{
				nextMessageUuid: LOAN_AGREEMENT_CONSENT_MESSAGE_UUID,
				uuid: makeActionUuid(),
				text: "Yes, it is",
			},
			{
				nextMessageUuid: LOAN_AGREEMENT_CONSENT_MESSAGE_UUID,
				uuid: makeActionUuid(),
				text: "No, edit",
			},
		],
		text: "📄 Got it! Your bank account informations are:\n\t• Full Name: Juan Dela Cruz\n\t• Account Number: 123456789\n\t• Bank Name: First National Bank\n\t• Routing Number (ABA): 987654321\n\nIs this correct?",
		uuid: CONFIRM_BANK_INFO_BOT_MESSAGE_UUID,
		createdAt: makeISODateString(),
		type: MessageType.BUTTONS,
		createdBy: botUser,
	},
	[LOAN_AGREEMENT_CONSENT_MESSAGE_UUID]: {
		text: (
			<p className="p-3">
				Before we proceed with the payout, please review the loan agreement and
				terms. You can find the document here:{" "}
				<a
					href={handleMakeLink(Route.LoanAgreement)}
					className="underline link font-bold"
					rel="noopener noreferrer"
					target="_blank"
				>
					[Link to PDF]
				</a>
				{`\n\nBy clicking "I agree," you consent to the terms and conditions of the loan agreement.

Here's a quick summary of the key points:

• Loan Amount: ₱50,000
• Interest Rate: 1.5% monthly
• Repayment Period: 12 months
• Monthly Payment: ₱4,584
• Total Amount to Pay: ₱55,008`}
			</p>
		),
		actions: [
			{
				nextMessageUuid: APPROVAL_DISBURSEMENT_MESSAGE_UUID,
				uuid: makeActionUuid(),
				text: "I agree",
			},
			{
				nextMessageUuid: APPROVAL_DISBURSEMENT_MESSAGE_UUID,
				text: "No, I don't agree",
				uuid: makeActionUuid(),
			},
		],
		uuid: LOAN_AGREEMENT_CONSENT_MESSAGE_UUID,
		createdAt: makeISODateString(),
		type: MessageType.BUTTONS,
		createdBy: botUser,
	} as const,
	[APPROVAL_DISBURSEMENT_MESSAGE_UUID]: {
		text: "Thank you for your confirmation.\n\nWe have received your approval and are now processing the loan payout to your account. You will receive a notification once the funds have been successfully disbursed.\n\nYou can Track your loan status here at any time.\n\nIf you have any questions, just type HELP or contact our customer support.",
		uuid: APPROVAL_DISBURSEMENT_MESSAGE_UUID,
		createdAt: makeISODateString(),
		type: MessageType.TEXT,
		createdBy: botUser,
	} as const,
};

export const CONVERSATION_FLOW = {
	[BOT_UPLOAD_ID_MESSAGE_UUID]: {
		userResponse: USER_UPLOAD_ID_MESSAGE_UUID_FIRST,
		botResponse: BLURRY_ID_MESSAGE_UUID,
		delay: 1500,
	},
	[BLURRY_ID_MESSAGE_UUID]: {
		userResponse: USER_UPLOAD_ID_MESSAGE_UUID_SECOND,
		botResponse: ID_PARSING_CONFIRMATION_MESSAGE_UUID,
		delay: 1500,
	},
	[CORRECT_NAME_MESSAGE_UUID]: {
		userResponse: "text-input",
		botResponse: ID_PARSING_CONFIRMATION_MESSAGE_UUID,
		delay: 1500,
	},
	[ID_VERIFICATION_MATCH_MESSAGE_UUID]: {
		userResponse: MISSING_LOYALTY_CARD_USER_MESSAGE_UUID,
		botResponse: MISSING_LOYALTY_CARD_BOT_MESSAGE_UUID,
		delay: 1500,
	},
	[MISSING_LOYALTY_CARD_BOT_MESSAGE_UUID]: {
		userResponse: "text-input-loyalty-card",
		botResponse: COLLECT_BANK_INFO_MESSAGE_UUID,
		delay: 1500,
	},
	[COLLECT_BANK_INFO_MESSAGE_UUID]: {
		userResponse: SEND_BANK_INFO_MESSAGE_UUID,
		botResponse: CONFIRM_BANK_INFO_BOT_MESSAGE_UUID,
		delay: 1500,
	},
};

export const FAKE_WORKFLOW_INITIAL_MESSAGES: Array<Message> = [
	{
		text: "Hi! 👋 You've received a special loan offer from PartnerMart. I'll just verify your identity so we can check your eligibility. By continuing, you agree we'll process your information to confirm your identity and prepare your loan agreement.",
		createdAt: makeISODateString(),
		uuid: makeMessageUuid(),
		type: MessageType.TEXT,
		createdBy: botUser,
	},
	{
		actions: [
			{
				nextMessageUuid: BOT_UPLOAD_ID_MESSAGE_UUID,
				uuid: makeActionUuid(),
				text: "Continue",
			},
		],
		createdAt: makeISODateString(),
		type: MessageType.BUTTONS,
		uuid: makeMessageUuid(),
		createdBy: botUser,
		text: "",
	},
];
