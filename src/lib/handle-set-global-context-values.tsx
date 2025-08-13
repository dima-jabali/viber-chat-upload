import { useQueryClient } from "@tanstack/react-query";

import { EmptyFallbackSuspense } from "#/components/empty-fallback-suspense";
import { useGlobalStore } from "#/contexts/global-store";
import { useGetUser } from "#/hooks/get/user";

export function HandleSetGlobalContextValues() {
	const globalStore = useGlobalStore();
	const queryClient = useQueryClient();

	globalStore.setState({ queryClient });

	return (
		<EmptyFallbackSuspense>
			<SetFetchedValues />
		</EmptyFallbackSuspense>
	);
}

function SetFetchedValues() {
	const globalStore = useGlobalStore();
	const user = useGetUser();

	if (user) {
		globalStore.setState({ userUuid: user.uuid });
	}

	return null;
}
