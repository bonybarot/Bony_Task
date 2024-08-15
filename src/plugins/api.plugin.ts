import axios, { AxiosInstance } from 'axios';
import Toast from 'react-native-toast-message';
import config from '../config/index';

class APIClient {
  public apiClient!: AxiosInstance;

  public constructor() {
    this.assign(config.baseUrl);
  }

  private assign = async (BASE_URL: string) => {
    this.apiClient = axios.create({
      baseURL: BASE_URL,
    });
    this.apiClient.interceptors.response.use(
      (response:any) => {
        return response;
      },
      async (error:any) => {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
      },
    );
  };
}

export default new APIClient();
