import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    GenericAbortSignal,
    InternalAxiosRequestConfig,
} from 'axios';
import * as qs from 'qs';

class HttpService {
    session: AxiosInstance;

    constructor() {
        this.session = axios.create();
    }

    requestHandler(request: InternalAxiosRequestConfig) {
        request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        request.data = qs.stringify(request.data);
        return request;
    }

    responseHandler(response: AxiosResponse) {
        return response;
    }

    errorHandler(error: AxiosError) {
        return Promise.reject(error);
    }

    get = (url: string, params?: unknown, signal?: GenericAbortSignal) =>
        this.session.get(url, { params, signal });
    post = (
        url: string,
        data?: unknown,
        signal?: GenericAbortSignal,
    ) => {
        return this.session.post(url, data, { signal })
    };
}

const httpInstance = Object.freeze(new HttpService());
export default httpInstance;