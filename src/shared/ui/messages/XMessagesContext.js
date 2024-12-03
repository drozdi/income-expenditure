import { createContext, useContext } from 'react';

export const XMessagesContext = createContext(null);

export function useXMessagesContext() {
	return useContext(XMessagesContext);
}
