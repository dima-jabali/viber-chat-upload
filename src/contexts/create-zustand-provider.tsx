import {
	createContext,
	useContext,
	useState,
	type PropsWithChildren,
} from "react";
import {
	createStore,
	type StoreApi,
	type useStore as zustandUseStore,
} from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";

// Type gotten from lib itself:
export type StoreSubscribeWithSelector<T> = {
	subscribe: {
		(
			listener: (selectedState: T, previousSelectedState: T) => void,
		): () => void;
		<U>(
			selector: (state: T) => U,
			listener: (selectedState: U, previousSelectedState: U) => void,
			options?: {
				equalityFn?: (a: U, b: U) => boolean;
				fireImmediately?: boolean;
			},
		): () => void;
	};
};

export type ZustandContextStore<T> = Omit<StoreApi<T>, "subscribe"> &
	StoreSubscribeWithSelector<T>;

export const createZustandProvider = <
	InitialState extends Record<string, unknown>,
	ExtraInitialParams extends Record<string, unknown> = Partial<InitialState>,
>(
	initialState:
		| ((
				get: StoreApi<InitialState>["getState"],
				set: StoreApi<InitialState>["setState"],
				extraInitialParams?: ExtraInitialParams,
		  ) => InitialState)
		| InitialState,
	config: {
		name: string;
	},
) => {
	const Context = createContext<ZustandContextStore<InitialState> | null>(null);

	const Provider: React.FC<
		PropsWithChildren<{
			extraInitialParams?: ExtraInitialParams;
		}>
	> = ({ children, extraInitialParams }) => {
		const [store] = useState(() => {
			const store = createStore(
				subscribeWithSelector<InitialState>((set, get) => {
					if (typeof initialState === "function") {
						return initialState(get, set, extraInitialParams);
					}

					return { ...initialState, ...extraInitialParams };
				}),
			);

			return store;
		});

		return <Context.Provider value={store}>{children}</Context.Provider>;
	};

	const useStore = () => {
		const store = useContext(Context);

		if (!store) {
			throw new Error(
				`\`useStore\` must be used within a Provider (${config.name})`,
			);
		}

		return store;
	};

	const useSelectStore = <S,>(
		selector: Parameters<typeof zustandUseStore<StoreApi<InitialState>, S>>[1],
	) => {
		const store = useContext(Context);

		if (!store) {
			throw new Error(
				`\`useSelectStore\` must be used within a Provider (${config.name})`,
			);
		}

		return useStoreWithEqualityFn(store, selector, shallow);
	};

	return {
		Provider,
		useSelectStore,
		useStore,
	};
};
