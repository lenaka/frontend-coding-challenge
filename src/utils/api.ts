import axios from 'axios';

interface ApiConfig {
  baseUrl: string;
}

type SaveRequestProps = {
  method?: 'get' | 'delete' | 'put' | 'post';
  data?: object;
  url?: string;
};

const Api = (config: ApiConfig) => {
  const instance = axios.create({
    baseURL: config.baseUrl
  });

  let lastRequest: SaveRequestProps = {};

  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const config = error?.response?.config || error.config;
      console.log('!!', config.method);

      if (config.method !== 'retry') {
        lastRequest = {
          method: config.method,
          url: config.url
        };

        if (config.data) {
          lastRequest.data = config.data;
        }
      }
      console.log(lastRequest);

      return Promise.reject(error);
    }
  );

  return {
    get: (url: string) => instance.get(url),
    post: (url: string, data: object) => instance.post(url, data),
    put: (url: string, data: object) => instance.put(url, data),
    delete: (url: string) => instance.delete(url),
    retry: () => {
      console.log('RETRY', lastRequest);
      if (lastRequest.method && lastRequest.url) {
        return instance[lastRequest.method](lastRequest.url, lastRequest?.data);
      }
    }
  };
};

const apiConfig = {
  baseUrl: process.env.REACT_APP_API_BASE_URL as string
};

export default Api(apiConfig);
