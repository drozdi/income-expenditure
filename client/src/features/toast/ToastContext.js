import { createContext, useContext } from 'react';

export const ToastContext = createContext({
	show(...args) {
		console.log('toast show', args);
	},
	replace(...args) {
		console.log('toast replace', args);
	},
	clear() {
		console.log('toast clear');
	},
});

export function useToast() {
	const context = useContext(ToastContext);
	if (context?.current) {
		return context.current;
	}
	return context;
}
