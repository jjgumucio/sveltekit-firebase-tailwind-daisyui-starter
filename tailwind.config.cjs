const config = {
	content: ['./src/**/*.{html,js,jsx,svelte,tsx}'],
	theme: {
		extend: {}
	},

	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};

module.exports = config;
