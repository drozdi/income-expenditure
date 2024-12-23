import { useRef } from 'react';
import { ToastContext } from './ToastContext';

export function ToastProvider({ children }) {
	const toast = useRef(null);
	/*return (
		<>
			<XToast
				underlined
				closable
				square
				life={6000}
				position="right-center"
				ref={toast}
			/>
			<ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
		</>
	);*/
	return (
		<>
			<ToastContext.Provider value={null}>{children}</ToastContext.Provider>
		</>
	);
}
