import axios from "axios";

const MAX_INFLIGHT_REQUESTS = 50;
const INTERVAL_MS = 1000;

let _currentInflightRequests = 0;

const API_URL = 'http://localhost:3030';

// this initial block sets up the axios client and
// all the needed interceptors

export const axiosInstance = axios.create();

// throttle to a max number of concurrent requests
// this helps to insure that in the case of a client side
// bug, we don't accidentally DDOS our own service
axiosInstance.interceptors.request.use((config) => {
    return new Promise((resolve, reject) => {
        let interval = setInterval(() => {
            if (_currentInflightRequests < MAX_INFLIGHT_REQUESTS) {
                _currentInflightRequests++;
                clearInterval(interval);
                resolve(config);
            }
        }, INTERVAL_MS);
    });
});

// some functions to handle waiting and retrying on a 429,
// in case the service has ingress controls that throttles us
// for some reason
const retryAfter = {
    isRetryable: (error: any) => {
        return !!(
            error.response &&
            error.response.status === 429 &&
            error.response.headers["retry-after"]
        );
    },

    wait: (error: any) => {
        return new Promise((resolve) =>
            setTimeout(resolve, error.response.headers["retry-after"]),
        );
    },

    retry: (error: any) => {
        if (!error.config) {
            throw error;
        } else {
            return axiosInstance(error.config);
        }
    },
};

// create the retry-after interceptor
axiosInstance.interceptors.response.use(null as any, async (error) => {
    if (retryAfter.isRetryable(error)) {
        await retryAfter.wait(error);
        return retryAfter.retry(error);
    } else {
        throw error;
    }
});

// once a response is done, make sure we decrement the inflight request count
axiosInstance.interceptors.response.use(
    (response) => {
        _currentInflightRequests = Math.max(0, _currentInflightRequests - 1);
        return Promise.resolve(response);
    },
    (error) => {
        if (
            error.response &&
            (error.response.status !== 429 ||
                !error.response.headers["retry-after"])
        ) {
            _currentInflightRequests = Math.max(
                0,
                _currentInflightRequests - 1,
            );
            return Promise.reject(error);
        }
    },
);

// the following methods provide an interface to call the APIs without having to
// scatter axios calls throughout the code.

export const receiveData = async (params: { url: string }) => {
    const endpoint = params.url;

    const response = await axiosInstance({
        method: "GET",
        url: endpoint,
        timeout: 60000,
    });
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error(response.data.message);
    }
};

// the API given for the assessment exercise is a read-only API,
// but this would be used by wrapper functions for any POST, PUT, PATCH,
// or DELETE calls, if they existed.  It's dead code at the moment,
// but I am including it for completeness, as I would typically make use
// of this in an api wrapper file such as this
export const sendData = async (
    params: { url: string; data?: any },
    method: any,
) => {
    const endpoint = params.url;

    const response = await axiosInstance({
        method,
        data: params.data,
        url: endpoint,
        timeout: 60000,
    });
    if (response.status === 200) {
        return response;
    } else {
        throw new Error(response.data.message);
    }
};

// pages
export const getPageSpec = (pageId: string) => {
    const url = `${API_URL}/page/${pageId}`;
    return receiveData({ url });
};

// weather
export const getWeather = (lat: number, lon: number) => {
    const url = `${API_URL}/weather/?lat=${lat}&lon=${lon}`;
    return receiveData({ url });
};
