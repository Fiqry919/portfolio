/* eslint-disable */
import { omit } from "lodash";
import { RequestOptions } from "../interfaces/request";

const DEV_MODE = process.env.NODE_ENV === 'development'

export default async function Request<T = any>(options: RequestOptions<T>, forceJson: boolean = true) {
    const start = Date.now()
    const data = { ...RequestOptions, ...options }
    try {
        let timeout: any;
        if (data.timeout) {
            const controller = new AbortController();
            timeout = setTimeout(() => controller.abort(), data.timeout);
            data.signal = controller.signal;
        }

        if (forceJson) {
            data.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        if (data.authorization) {
            data.headers = {
                ...data.headers,
                'Authorization': `Bearer ${data.authorization}`
            }
        }

        if (forceJson && data.body) data.body = JSON.stringify(data.body);

        const response = await fetch(data.url, { ...omit(data, 'url') });
        const result = await response.json();

        if (timeout) {
            clearTimeout(timeout);
        }

        if (options.success) {
            return options.success(result, response.status);
        } else {
            return result;
        }
    } catch (e) {
        if (options.error) {
            return options.error(<Error>e);
        } else {
            return <Error>e;
        }
    } finally {
        if (options.finally) options.finally();
        if (DEV_MODE) {
            const end = Date.now();
            console.log(`[${data.method}] request_execution_time:`, `${end - start} ms`)
        }
    }
}