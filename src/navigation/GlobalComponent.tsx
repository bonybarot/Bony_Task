import { NavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';
import { StackNav } from './NavigationKeys';

type Props = {
  navigation: NavigationContainerRef<any>;
  children: React.ReactNode;
};
const OfflineWatcher: React.FC<Props> = ({ children, navigation }) => {
  React.useEffect(() => {
    const currentRoute: any = navigation.getCurrentRoute();
    if (currentRoute && currentRoute.name !== StackNav.Auth) {
      navigation.reset({
        index: 0,
        routes: [{ name: StackNav.Auth }],
      });
    }
  }, []);
  return <>{children}</>;
};
export default OfflineWatcher;
