/* eslint-disable */
export interface ResponseError extends Error {
    /**
     * response error code
     */
    code: number
    /**
     * response error message
     */
    message: any
}

export interface ResponseErrorConstructor extends ErrorConstructor {
    new(message: any, code?: number): ResponseError
    (message: any, code?: number): ResponseError
    /**
     * Parse unknown error to ResponseError.
     * @returns ResponseError
     */
    parse: (e: unknown, trace?: boolean) => ResponseError
    readonly prototype: ResponseError
}

declare global {
    var ResponseError: ResponseErrorConstructor
}

global.ResponseError = function (this: ResponseError, message: any, code?: number) {
    this.code = code || 500;
    this.message = message;
} as any;

global.ResponseError.parse = (e: unknown) => e instanceof ResponseError ? e
    : new ResponseError((<Error>e).message);