import {ILogin} from '../interfaces/common';
import APIClient from '../plugins/api.plugin';

class AuthService {
  login(payload: ILogin) {
    return APIClient.apiClient.post('login', payload);
  }
}

export default new AuthService();
