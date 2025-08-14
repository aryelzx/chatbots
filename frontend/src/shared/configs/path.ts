const pathBuilder = (mode: string) => {
	const production = "http://34.151.226.139/api";
	const development = "http://34.151.226.139/api";

	return mode === "production" ? production : development;
};

const baseURL = pathBuilder(import.meta.env.MODE);

export { baseURL };
