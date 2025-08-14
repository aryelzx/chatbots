const pathBuilder = (mode: string) => {
	const production = "http://backend:80/api";
	const development = "http://backend:80/api";

	return mode === "production" ? production : development;
};

const baseURL = pathBuilder(import.meta.env.MODE);

export { baseURL };
