import { createContext, useContext } from 'react';

export const XToastContext = createContext(null);

export function useXToastContext() {
	const context = useContext(XToastContext);
	return context;
}
