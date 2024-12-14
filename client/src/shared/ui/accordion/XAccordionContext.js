import { createContext, useContext } from 'react';

export const XAccordionContext = createContext(null);

export function useXAccordionContext() {
	return useContext(XAccordionContext);
}
