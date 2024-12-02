import { Provider } from 'react-redux';
import { createStore } from '../shared/store';
const store = createStore();

export const AppProvider = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};
