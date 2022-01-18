import {AxiosError, AxiosRequestConfig} from "axios";

export default function ({ $axios } : any, inject : any) {
  // Create a custom axios instance
  const CRM = $axios.create({
    baseURL: 'localhost:8000/api/crms',
    timeout: 60000
  })

  CRM.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // store.dispatch('SET_GLOBAL_LOADING', true);
      console.log(config)
      return config;
    },
    (error: AxiosError) => {
      // store.dispatch('SET_GLOBAL_LOADING', false);
      console.log(error)
      return Promise.reject(error);
    }
  );

  // Inject to context as $api
  inject('CRM', CRM)
}
