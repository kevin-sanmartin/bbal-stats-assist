import { useCallback, useState } from "react";

export const useExample = () => {
	const [state, setState] = useState<number>(0);

	const increment = useCallback(() => {
		setState((prev) => prev + 1);
	}, []);

	return { state, increment };
};
