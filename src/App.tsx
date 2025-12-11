import { useLayoutEffect } from "react";
import { useGlobalStore, useRoute } from "./contexts/global-store";
import { Route } from "./lib/enums";
import { ChatApp } from "./routes/chat-app";
import LivenessCheckPage from "./routes/liveness-check";
import { LoanAgreement } from "./routes/loan-agreement";

export function App() {
	const globalStore = useGlobalStore();
	const route = useRoute();

	useLayoutEffect(() => {
		const url = new URL(window.location.href);

		if (url.searchParams.has("r")) {
			globalStore.setState({route:url.searchParams.get("r") as Route});
		}
	}, [globalStore])

	switch (route) {
		case Route.LoanAgreement:
			return <LoanAgreement />;

		case Route.ChatApp:
			return <ChatApp />;

		case Route.LivenessCheck:
			return <LivenessCheckPage />;

		default:
			console.error("Unknown route", route);

			return null;
	}
}
