import { useRoute } from "./hooks/url/use-thing-to-upload";
import { Route } from "./lib/enums";
import { ChatApp } from "./routes/chat-app";
import { LoanAgreement } from "./routes/loan-agreement";
import { UploadIds } from "./routes/upload-ids";

export function App() {
	const [route] = useRoute();

	switch (route) {
		case Route.PartnerMartNumber:
		case Route.ID_SecondTime:
		case Route.ID_FirstTime:
		case Route.PartnerMart:
		case Route.LoanPayout:
			return <UploadIds />;

		case Route.LoanAgreement:
			return <LoanAgreement />;

		case Route.ChatApp:
			return <ChatApp />;

		default:
			console.error("Unknown route", route);

			return null;
	}
}
