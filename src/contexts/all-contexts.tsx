import { type PropsWithChildren, StrictMode, useState } from "react";
import { NuqsAdapter } from "nuqs/adapters/react";

import { GlobalStoreProvider } from "./global-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HandleSetGlobalContextValues } from "#/lib/handle-set-global-context-values";

export function AllContexts({ children }: PropsWithChildren) {
	const queryClient = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						experimental_prefetchInRender: true,
						refetchOnWindowFocus: false,
						refetchOnMount: false,
					},
				},
			}),
	)[0];

	return (
		<StrictMode>
			<NuqsAdapter>
				<GlobalStoreProvider>
					<QueryClientProvider client={queryClient}>
						<HandleSetGlobalContextValues />

						{children}
					</QueryClientProvider>
				</GlobalStoreProvider>
			</NuqsAdapter>
		</StrictMode>
	);
}
