import type { THttpTitle } from "@/boot/enums/http.enum.js";

type TErrorDetail = {
    path: string | number;
    message: string;
};
export type TErrorBodyDetail =
    | TErrorDetail
    | TErrorDetail[];

export interface IApiError {
    name: string;
    message: string;
    title?: THttpTitle | "HTTP API ERROR";
    detail?: TErrorBodyDetail;
    stack?: string;
}

export type THTTPErrorBody = Pick<IApiError, 'title' | 'message' | 'detail'>;

export type TErrorResponse = {
    status: number;
    errors: IApiError[];
};