import '@mdi/font/css/materialdesignicons.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';
import { ThemeProvider } from './shared/hooks/useTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<ThemeProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ThemeProvider>,
);
