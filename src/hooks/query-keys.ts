import { createQueryKeyStore } from "@lukemorales/query-key-factory";

import { api } from "#/lib/api";

export const queryKeyFactory = createQueryKeyStore({
	get: {
		user: {
			queryFn: () => api.get.user(),
			queryKey: null,
		},

		chats: {
			queryFn: () => api.get.chats(),
			queryKey: null,
		},
	},

	post: {},

	put: {},

	permissions: {},
});
