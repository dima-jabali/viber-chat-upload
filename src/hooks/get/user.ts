import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import type { User } from "~/types/general";
import { queryKeyFactory } from "../query-keys";

export function useGetUser<Select = User>(select?: (data: User) => Select) {
	const options = useMemo(
		() => ({
			...queryKeyFactory.get.user,
			select,
		}),
		[select],
	);

	return useSuspenseQuery(options).data;
}
