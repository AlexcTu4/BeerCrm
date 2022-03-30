import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

export default ({ $axios } : any, inject : any) => {
  // Create a custom axios instance
  const CONTACTS = $axios.create({
    baseURL: '/api/contacts',
    timeout: 60000
  })

  CONTACTS.interceptors.request.use(
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

  CONTACTS.interceptors.response.use(
    (response: AxiosResponse) => {
      return Promise.resolve(response);
    },
    (error: AxiosError) => {
      let message = error.message + '\n';
      for (let key in error?.response?.data?.errors) {
        message += error?.response?.data.errors[key] + '\n';
      }
      return Promise.reject({message: message,response: error.response});
    }
  );

  // Inject to context as $api
  inject('CONTACTS', CONTACTS)
}

