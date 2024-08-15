import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React from 'react';
import AppNavigator from './navigation/index';
import Toast, {
  BaseToast,
  ErrorToast,
  ToastProps,
} from 'react-native-toast-message';
import {Provider} from 'react-redux';
import store from './store/index';
import {QueryClient, QueryClientProvider} from 'react-query';

const App = () => {
  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props: ToastProps) => (
      <BaseToast
        {...props}
        style={{borderLeftColor: 'green'}}
        text1NumberOfLines={3}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props: ToastProps) => (
      <ErrorToast
        {...props}
        style={{borderLeftColor: 'red'}}
        text1NumberOfLines={3}
      />
    ),
  };
  const queryClient = new QueryClient();
  return (
    <View style={{flex: 1}}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <StatusBar barStyle={'dark-content'} />
          <AppNavigator />
          <Toast position="bottom" bottomOffset={20} config={toastConfig} />
        </QueryClientProvider>
      </Provider>
    </View>
  );
};

export default App;
