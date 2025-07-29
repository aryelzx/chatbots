import { toast } from "react-hot-toast";

const errorHandler = (error: any, context?: string) => {
	let err: string;

	const hasMultipleErrors = Array.isArray(error.response?.data.message);
	if (hasMultipleErrors) {
		err = `${
			error.response.data.statusCode
		}: ${error.response.data.message.join(" / ")}`;
	} else if (error.response.data) {
		err = `${error.response.data.statusCode}: ${error.response.data.message}`;
	} else {
		err = "500: Erro interno do servidor";
	}

	console.error(`${context?.toUpperCase()} - ${err}`);
	toast.error(err);
};

export { errorHandler };
