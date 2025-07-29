const pathBuilder = (mode: string) => {
	const production = import.meta.env.VITE_API_URL_PRODUCTION;
	const development = import.meta.env.VITE_API_URL_DEVELOPMENT;

	return mode === "production" ? production : development;
};

const baseURL = pathBuilder(import.meta.env.MODE);

export { baseURL };
