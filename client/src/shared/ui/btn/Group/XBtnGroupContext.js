import { createContext, useContext } from 'react';

export const XBtnGroupContext = createContext(null);

export function useXBtnGroupContext() {
	return useContext(XBtnGroupContext);
}
