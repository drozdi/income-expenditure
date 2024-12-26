/*        'primary': '#1976d2',
        'secondary': '#5cbbf6',
        'info': '#2196f3',
        'warning': '#fb8c00',
        'success': '#4caf50',
        'danger': '#dc3545',
        'dark': '#1d1d1d',
        'surface': '#15171e',
        'dimmed': 'rgba(0, 0, 0, .4)',
        'divider': 'rgba(255, 255, 255, 0.15)',*/
module.exports = {
	content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
	darkMode: ['selector'],
	corePlugins: {
		preflight: false,
	},
};
