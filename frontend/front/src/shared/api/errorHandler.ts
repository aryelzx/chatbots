import { toast } from "react-hot-toast";

const errorHandler = (error: any, context?: string) => {
	let err: string;

	if (error.message) {
		err = `${error.message}`;
	} else {
		err = "500: Erro interno do servidor";
	}

	console.error(`${context?.toUpperCase()} - ${err}`);
	toast.error(err);
};

export { errorHandler };
