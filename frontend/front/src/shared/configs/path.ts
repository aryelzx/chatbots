const pathBuilder = (mode: string) => {
	const production = "http://localhost:5074/api";
	const development = "http://localhost:5074/api";

	return mode === "production" ? production : development;
};

const baseURL = pathBuilder(import.meta.env.MODE);

export { baseURL };
