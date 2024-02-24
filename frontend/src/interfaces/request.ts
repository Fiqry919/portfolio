/* eslint-disable */
export interface RequestOptions<T = any> extends RequestInit {
    url: string,
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'DELETE'
    body?: any
    success?: (response: T, status: number) => any
    error?: (error: Error) => any
    finally?: () => void
    authorization?: string | boolean
    timeout?: number
}

export const RequestOptions: Partial<RequestOptions> = {
    method: 'GET',
    // mode: 'cors',
    // credentials: 'include'
}