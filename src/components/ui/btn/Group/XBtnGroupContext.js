import { createContext, useContext } from 'react';

export const XBtnGroupContext = createContext(null);

export function useXBtnGroupContext(props = {}) {
	return {
		...(useContext(XBtnGroupContext) ?? {
			selected: false,
			multiple: false,
			current: undefined,
		}),
		...props,
	};
}
