import { toast } from "react-toastify";

export enum ErrorType {
  NotFound = '404 - Not Found',
  Unauthorized = '401 - Unauthorized',
  BadRequest = '400 - Bad Request',
}


export class ErrorResponse {
  type: ErrorType;
  message: string;

  public constructor(type: ErrorType, message: string) {
    this.type = type;
    this.message = message;
  }
}

declare global {
  interface Promise<T> {
    handleErrors(): Promise<any | null>;
  }

}
export function handleErrors<T>(value: T | ErrorResponse): boolean {
  if (value instanceof ErrorResponse) {
    toast.error(value.message, {
      position: "top-center",
      progress: undefined,
      theme: "light",
      closeOnClick: true,
      pauseOnHover: false
    });
    return false;
  }
  return true;
}
