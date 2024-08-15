import {NavigationProp} from '@react-navigation/native';

export interface ILogin {
  email: string;
  password: string;
}

export interface INavigation {
  navigation: NavigationProp<any, any>;
}
