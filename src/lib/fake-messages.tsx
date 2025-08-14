import {
	type Message,
	MessageType,
	makeActionUuid,
	makeISODateString,
	makeMessageUuid,
} from "#/types/general";
import { Route } from "./enums";
import { botUser, user } from "./fake-users";

export const USER_DONT_HAVE_LOYALTY_CARD_MESSAGE_UUID = makeMessageUuid();
export const BOT_DONT_HAVE_LOYALTY_CARD_MESSAGE_UUID = makeMessageUuid();
export const LOAN_AGREEMENT_CONSENT_MESSAGE_UUID = makeMessageUuid();
export const ID_VERIFICATION_MATCH_MESSAGE_UUID = makeMessageUuid();
export const APPROVAL_DISBURSEMENT_MESSAGE_UUID = makeMessageUuid();
export const UPLOAD_LOYALTY_CARD_MESSAGE_UUID = makeMessageUuid();
export const COLLECT_BANK_INFO_MESSAGE_UUID = makeMessageUuid();
export const UPLOAD_ID_MESSAGE_UUID = makeMessageUuid();

const BASE_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000/?r="
		: "https://viber-chat-upload.vercel.app/?r=";

function handleMakeLink(url: Route) {
	const link = `${BASE_URL}${encodeURI(url)}`;

	return link;
}

export const ALL_MESSAGES: Record<string, Message> = {
	[UPLOAD_ID_MESSAGE_UUID]: {
		text: (
			<p>
				Please upload a clear photo of your government ID (front) on this link:{" "}
				<a
					href={handleMakeLink(Route.ID)}
					className="underline link font-bold"
					rel="noopener noreferrer"
					target="_blank"
				>
					[Link to upload ID photo]
				</a>
				.
			</p>
		),
		createdAt: makeISODateString(),
		uuid: UPLOAD_ID_MESSAGE_UUID,
		type: MessageType.TEXT,
		createdBy: botUser,
	},
	[ID_VERIFICATION_MATCH_MESSAGE_UUID]: {
		text: (
			<p>
				Verifying your details…{"\n\n"}✅ Great news, Juan! You're pre-approved
				for ₱50,000 at 1.5% monthly, payable in 12 months.{"\n\n"}Please upload
				a photo of your PartnerMart loyalty card:{" "}
				<a
					href={handleMakeLink(Route.PartnerMart)}
					className="underline link font-bold"
					rel="noopener noreferrer"
					target="_blank"
				>
					[Link to upload photo of PartnerMart loyalty card]
				</a>
				.
			</p>
		),
		uuid: ID_VERIFICATION_MATCH_MESSAGE_UUID,
		createdAt: makeISODateString(),
		type: MessageType.TEXT,
		createdBy: botUser,
	},
	[USER_DONT_HAVE_LOYALTY_CARD_MESSAGE_UUID]: {
		uuid: USER_DONT_HAVE_LOYALTY_CARD_MESSAGE_UUID,
		text: "I don't have it with me",
		createdAt: makeISODateString(),
		type: MessageType.TEXT,
		createdBy: user,
	},
	[BOT_DONT_HAVE_LOYALTY_CARD_MESSAGE_UUID]: {
		text: (
			<p>
				Got it, you don't have a PartnerMart loyalty card with you.{'\n\n'}
				In that case, please enter your PartnerMart loyalty card number:
				<a
					href={handleMakeLink(Route.PartnerMartNumber)}
					className="underline link font-bold"
					rel="noopener noreferrer"
					target="_blank"
				>
					[Link to enter PartnerMart loyalty card number]
				</a>
				.
			</p>
		),
		uuid: BOT_DONT_HAVE_LOYALTY_CARD_MESSAGE_UUID,
		createdAt: makeISODateString(),
		type: MessageType.TEXT,
		createdBy: botUser,
	},
	[COLLECT_BANK_INFO_MESSAGE_UUID]: {
		text: (
			<p>
				Alright. Now, please provide the following details to process your loan
				payout at this{" "}
				<a
					href={handleMakeLink(Route.LoanPayout)}
					className="underline link font-bold"
					rel="noopener noreferrer"
					target="_blank"
				>
					[link]
				</a>
				:
				{
					"\n\n\t• Full Name:\n\t• Account Number:\n\t• Bank Name:\n\t• Routing Number (ABA)"
				}
			</p>
		),
		uuid: COLLECT_BANK_INFO_MESSAGE_UUID,
		createdAt: makeISODateString(),
		type: MessageType.TEXT,
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
	[UPLOAD_ID_MESSAGE_UUID]: {
		botResponse: ID_VERIFICATION_MATCH_MESSAGE_UUID,
		userResponse: null,
		delay: 1500,
	},
	[ID_VERIFICATION_MATCH_MESSAGE_UUID]: {
		userResponse: USER_DONT_HAVE_LOYALTY_CARD_MESSAGE_UUID,
		botResponse: BOT_DONT_HAVE_LOYALTY_CARD_MESSAGE_UUID,
		delay: 1500,
	},
	[BOT_DONT_HAVE_LOYALTY_CARD_MESSAGE_UUID]: {
		botResponse: COLLECT_BANK_INFO_MESSAGE_UUID,
		userResponse: null,
		delay: 1500,
	},
	[COLLECT_BANK_INFO_MESSAGE_UUID]: {
		userResponse: null,
		botResponse: LOAN_AGREEMENT_CONSENT_MESSAGE_UUID,
		delay: 1500,
	},
	[LOAN_AGREEMENT_CONSENT_MESSAGE_UUID]: {
		userResponse: null,
		botResponse: null,
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
				nextMessageUuid: UPLOAD_ID_MESSAGE_UUID,
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
