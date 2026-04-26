import type { THttpTitle } from "@/boot/enums/http.enum.js";


export type TErrorBodyDetail =
    | { path: string | number, message: string }
    | { path: string | number, message: string }[]

export type THTTPErrorBody = {
    title?: THttpTitle;
    message?: string;
    detail?: TErrorBodyDetail;
}

export interface IHTTPError {
    title: THttpTitle | 'HTTP API ERROR';
    detail?: TErrorBodyDetail;
}