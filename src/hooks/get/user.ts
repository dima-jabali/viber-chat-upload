import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { queryKeyFactory } from "../query-keys";
import type { User } from "#/types/general";

export function useGetUser<Select = User>(select?: (data: User) => Select) {
	const options = useMemo(
		() => ({
			...queryKeyFactory.get.user,
			select,
		}),
		[select],
	);

	// @ts-expect-error
	return useSuspenseQuery(options).data;
}
