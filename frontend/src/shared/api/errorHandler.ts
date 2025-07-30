import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";

const errorHandler = (error: unknown, context?: string) => {
  let errMsg = "500: Erro interno do servidor";
  let statusCode: number | null = null;

  // Se for um erro Axios
  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError;
    statusCode = axiosError.response?.status ?? null;
    errMsg = axiosError.response?.data?.message ?? axiosError.message;
  } else if (error instanceof Error) {
    errMsg = error.message;
  }

  console.error(`${context?.toUpperCase() ?? "ERRO"} - [${statusCode ?? "??"}] ${errMsg}`);
  toast.error(`[${statusCode ?? "??"}] - ${errMsg}`);
};

export { errorHandler };