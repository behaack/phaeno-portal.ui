import { useNavigate } from '@tanstack/react-router';
import { useNetwork } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { constants } from '@/assets/constants';
import { Route as SignInRoute } from '@/routes/auth/signin';
import { useAppStore } from '@/stores/appStore';
import { useAuthStore } from '@/stores/authStore';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { isTokenExpiredSoon } from '@/assets/utils/isTokenExpiredSoon';
import { refreshAuthToken } from '@/assets/utils/refreshAuthToken';

const BASE_URL = import.meta.env.DEV ? constants.DEV_URL : constants.PROD_URL;

export interface IDatabase {
  httpGet: <TReturn>(url: string, showSpinner: boolean) => Promise<IHttpResponse<TReturn>>;
  httpPut: <TReturn, TData>(
    url: string,
    model: TData,
    showSpinner: boolean
  ) => Promise<IHttpResponse<TReturn>>;
  httpPost: <TReturn, TData>(
    url: string,
    model: TData,
    showSpinner: boolean
  ) => Promise<IHttpResponse<TReturn>>;
  httpPostDownload: <TReturn, TData>(
    url: string,
    model: TData,
    showSpinner: boolean
  ) => Promise<IHttpResponse<TReturn>>;
  httpPostFile: <TReturn, TData>(
    url: string,
    model: TData,
    showSpinner: boolean
  ) => Promise<IHttpResponse<TReturn>>;
  httpDelete: <TReturn>(url: string, showSpinner: boolean) => Promise<IHttpResponse<TReturn>>;
}

export interface IHttpResponse<T> {
  data: T | null;
  success: boolean;
  response: AxiosResponse<T, any> | null | undefined;
  error: AxiosError | null;
  statusCode: number | null;
}

export function useDatabase(): IDatabase {
  const navigate = useNavigate();
  const authStore = useAuthStore.getState();
  const appStore = useAppStore.getState();
  const network = useNetwork();

  const db = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    validateStatus: (status) => {
      return status >= 200 && status < 300;
    },
  });

  // Add authorization header
  db.interceptors.request.use(
    async (config) => {
      const auth = authStore.authToken;

      if (authStore.isAuthenticated && auth) {
        let token = auth.token;

        // Only refresh if about to expire AND this is not the refresh call
        if (isTokenExpiredSoon(token) && config.url !== "auth/RefreshAccessToken") {
          try {
            token = await refreshAuthToken(); // returns new token
          } catch (err) {
            authStore.logout();
          }
        }

        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    }
  );

  // Add Generic error handling
  // Status Code 500 & no response (network down or server not responding)
  db.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) {
        let message =
          'You appear to be disconnected from the network. Please check your connection and try again.';
        if (network.online) {
          message = 'Our server is not responding. Please try again later.';
        }
        notifications.show({
          color: 'red',
          title: 'Error',
          message,
          autoClose: false,
        });
      } else if (error.response.status === 500) {
        notifications.show({
          color: 'red',
          title: 'Error',
          message:
            'An unhandled server error occured. If this problem persists, please contact Phaeno support.',
          autoClose: false,
        });
      } else if (error.response.status === 429) {
        notifications.show({
          color: 'red',
          title: 'Error: Too Many Requests',
          message: 'You have exceeded your request rate. Try again in 1 minute.',
          autoClose: false,
        });
      }
      return Promise.reject(error);
    }
  );

  // Handle 401 refresh token
  db.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        authStore.isAuthenticated
      ) {
        originalRequest._retry = true;

        try {
          const newToken = await refreshAuthToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest); // retry succeeds
        } catch (err) {
          authStore.logout();
          return Promise.reject(err); // ✅ IMPORTANT
        }
      }

      return Promise.reject(error); // ✅ ALWAYS FALL THROUGH
    }
  );  

  const httpGet = async <T>(
    url: string,
    showSpinner: boolean = true
  ): Promise<IHttpResponse<T>> => {
    if (showSpinner) {
      appStore.incrementAsyncCount();
    }
    db.defaults.headers.common['Content-Type'] = 'application/json';
    const request: Promise<AxiosResponse<T, any>> = db.get<T>(url);
    return new Promise((resolve) => {
      request
        .then((response: AxiosResponse<T>) => {
          const result: IHttpResponse<T> = getSuccessResponse<T>(response);
          resolve(result);
        })
        .catch((error: AxiosError) => {
          const result: IHttpResponse<T> = getFailureResponse<T>(error);
          resolve(result);
        })
        .finally(() => {
          if (showSpinner) {
            appStore.decrementAsyncCount();
          }
        });
    });
  };

  const httpPost = async <TReturn, TData>(
    url: string,
    model: TData,
    showSpinner: boolean = true
  ): Promise<IHttpResponse<TReturn>> => {
    if (showSpinner) {
      appStore.incrementAsyncCount();
    }
    db.defaults.headers.common['Content-Type'] = 'application/json';
    const request: Promise<AxiosResponse<TReturn, any>> = db.post<TReturn>(url, model);
    return new Promise((resolve) => {
      request
        .then((response: AxiosResponse<TReturn>) => {
          const result: IHttpResponse<TReturn> = getSuccessResponse<TReturn>(response);
          resolve(result);
        })
        .catch((error: AxiosError) => {
          const result: IHttpResponse<TReturn> = getFailureResponse<TReturn>(error);
          resolve(result);
        })
        .finally(() => {
          if (showSpinner) {
            appStore.decrementAsyncCount();
          }
        });
    });
  };

  const httpPostDownload = async <TReturn, TData>(
    url: string,
    model: TData,
    showSpinner: boolean = true
  ): Promise<IHttpResponse<TReturn>> => {
    if (showSpinner) {
      appStore.incrementAsyncCount();
    }
    const request: Promise<AxiosResponse<TReturn, any>> = db.post<TReturn>(url, model, {
      responseType: 'blob',
    });
    return new Promise((resolve) => {
      request
        .then((response: AxiosResponse<TReturn>) => {
          const result: IHttpResponse<TReturn> = getSuccessResponse<TReturn>(response);
          resolve(result);
        })
        .catch((error: AxiosError) => {
          const result: IHttpResponse<TReturn> = getFailureResponse<TReturn>(error);
          resolve(result);
        })
        .finally(() => {
          if (showSpinner) {
            appStore.decrementAsyncCount();
          }
        });
    });
  };

  const httpPostFile = async <TReturn, TData>(
    url: string,
    model: TData,
    showSpinner: boolean = true
  ): Promise<IHttpResponse<TReturn>> => {
    if (showSpinner) {
      appStore.incrementAsyncCount();
    }
    db.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    const request: Promise<AxiosResponse<TReturn, any>> = db.post<TReturn>(url, model);
    return new Promise((resolve) => {
      request
        .then((response: AxiosResponse<TReturn>) => {
          const result: IHttpResponse<TReturn> = getSuccessResponse<TReturn>(response);
          resolve(result);
        })
        .catch((error: AxiosError) => {
          const result: IHttpResponse<TReturn> = getFailureResponse<TReturn>(error);
          resolve(result);
        })
        .finally(() => {
          if (showSpinner) {
            appStore.decrementAsyncCount();
          }
        });
    });
  };

  const httpPut = async <TReturn, TData>(
    url: string,
    model: TData,
    showSpinner: boolean = true
  ): Promise<IHttpResponse<TReturn>> => {
    if (showSpinner) {
      appStore.incrementAsyncCount();
    }
    db.defaults.headers.common['Content-Type'] = 'application/json';
    const request: Promise<AxiosResponse<TReturn, any>> = db.put<TReturn>(url, model);
    return new Promise((resolve) => {
      request
        .then((response: AxiosResponse<TReturn>) => {
          const result: IHttpResponse<TReturn> = getSuccessResponse<TReturn>(response);
          resolve(result);
        })
        .catch((error: AxiosError) => {
          const result: IHttpResponse<TReturn> = getFailureResponse<TReturn>(error);
          resolve(result);
        })
        .finally(() => {
          if (showSpinner) {
            appStore.decrementAsyncCount();
          }
        });
    });
  };

  const httpDelete = async <TReturn>(
    url: string,
    showSpinner: boolean = true
  ): Promise<IHttpResponse<TReturn>> => {
    if (showSpinner) {
      appStore.incrementAsyncCount();
    }
    db.defaults.headers.common['Content-Type'] = 'application/json';
    const request: Promise<AxiosResponse<TReturn, any>> = db.delete<TReturn>(url);
    return new Promise((resolve) => {
      request
        .then((response: AxiosResponse<TReturn>) => {
          const result: IHttpResponse<TReturn> = getSuccessResponse<TReturn>(response);
          resolve(result);
        })
        .catch((error: AxiosError) => {
          const result: IHttpResponse<TReturn> = getFailureResponse<TReturn>(error);
          resolve(result);
        })
        .finally(() => {
          if (showSpinner) {
            appStore.decrementAsyncCount();
          }
        });
    });
  };

  const getSuccessResponse = <TReturn>(
    response: AxiosResponse<TReturn>
  ): IHttpResponse<TReturn> => {
    return {
      data: response.data,
      success: true,
      response,
      error: null,
      statusCode: response.status,
    };
  };

  const getFailureResponse = <TReturn>(error: AxiosError): IHttpResponse<TReturn> => {
    return {
      data: null,
      success: false,
      response: null,
      error,
      statusCode: error.response?.status || null,
    };
  };

  return {
    httpGet,
    httpPut,
    httpPost,
    httpPostDownload,
    httpPostFile,
    httpDelete,
  };
}
