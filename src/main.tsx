import { createRoot } from "react-dom/client";

import { App } from "./App";
import { AllContexts } from "./contexts/all-contexts";

// biome-ignore lint/style/noNonNullAssertion: ignore
createRoot(document.getElementById("root")!).render(
	<AllContexts>
		<App />
	</AllContexts>,
);
