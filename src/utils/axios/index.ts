import axios, {
  type AxiosInstance,
  type AxiosResponse,
type InternalAxiosRequestConfig
} from "axios";

import Cookies from 'js-cookie'
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = 45000;


export const userInstance: AxiosInstance = axios.create();

// Request interceptor for the user instance
userInstance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    // Check if authorization token is present and add it to the request headers
    const authToken = Cookies.get('token');
    if (authToken) {
        config.headers = config.headers || {}; // Initialize headers if undefined
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});


userInstance.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        return response.data;
    },
    async (error) => {
        const { response, config } = error;
        if (response) {
            // Transform error response to show error, message, and status code
            const { data, status } = response;
            const error = data?.error || 'An error occurred';
            const message = data?.message ?? 'An error occurred, please try again'
            const statusCode = status || 500;
            if (response.status === 401 && !config._retry) {
                config._retry = true;
                const refreshToken = Cookies.get('refreshToken');
                if (refreshToken) {
                    try {
                        // Call your API to refresh the token
                        const refreshResponse = await authInstance.post('/api/v1/auth/refresh-token', {
                            refreshToken: Cookies.get('refreshToken'),
                        });
                        // Update cookies with new tokens
                        setTokens(refreshResponse.data.accessToken, refreshResponse.data.refreshToken, refreshResponse.data.expiresIn);
                        // Retry the original request with the new access token
                        config.headers['Authorization'] = `Bearer ${refreshResponse.data.accessToken}`;
                        return userInstance(config);

                    } catch (error) {
                        console.log('response error:', error)
                        // Handle refresh token failure (e.g., log out the user)
                        Cookies.remove('token')
                 
                        location.replace('/')
                        return Promise.reject({ error, message, statusCode });
                    }
                }
            }
            if (response.status === 403 || response.status === 401) {
                Cookies.remove('token')
            
                location.replace('/')

            }
            // Handle failed refresh here
            return Promise.reject({ error, message, statusCode });
        }
        console.log('response error:', error)
        return Promise.reject(error);
    }
);




export const authInstance: AxiosInstance = axios.create();




authInstance.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (response: AxiosResponse<any>) => {
    return response.data;
  },
  (error) => {
    const { response } = error;
    if (response) {
      const { data, status } = response;
      const errorMessage = data?.error || "An error occurred";
      const message = data?.message ?? "An error occurred, please try again";
      const statusCode = status || 500;
      return Promise.reject({ error: errorMessage, message, statusCode });
    }
    return Promise.reject(error);
  }
);


// Example function to set cookies when the user logs in or refreshes tokens
export function setTokens(accessToken: string, refreshToken: string, expiresIn: number) {
    console.log({ accessToken, refreshToken, expiresIn })

    // Set access token cookie with expiration
    Cookies.set('token', accessToken, { expires: 7 });

}