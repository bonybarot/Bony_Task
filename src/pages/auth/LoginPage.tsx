import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ETextInput from '../../components/common/ETextInput';
import {moderateScale} from '../../commonConstants/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StackNav} from '../../navigation/NavigationKeys';
import {ILogin, INavigation} from '../../interfaces/common';
import {loginUser} from '../../store/reducers/auth.reducer';
import {useAppDispatch} from '../../store/index';
import {useForm} from 'react-hook-form';

const LoginPage = ({navigation}: INavigation) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ILogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: ILogin) => {
    setLoading(true);
    try {
      const {payload} = await dispatch(loginUser(formData));
      if (payload) {
        navigation.reset({
          index: 0,
          routes: [{name: StackNav.BottomNavigationTab}],
        });
      }
    } catch (error) {
      // Handle error here if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, borderWidth: 1}} />
      <View style={styles.formContainer}>
        <ETextInput
          control={control}
          name="email"
          label="Email"
          placeholder="email@email.com"
        />

        <ETextInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text>Not a member?</Text>
          <TouchableOpacity style={styles.signUpLink}>
            <Text>Sign Up Here</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.lineContainer}>
        <View style={styles.diagonalLine} />
        <Text style={styles.orText}>or sign up with :</Text>
        <View style={styles.diagonalLine} />
      </View>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="google" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="apple1" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="facebook-square" size={30} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.guestButton}>
        <Text>Enter As Guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    margin: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#0000FF',
  },
  button: {
    backgroundColor: '#21D393',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: moderateScale(15),
    width: moderateScale(150),
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: moderateScale(10),
  },
  signUpLink: {
    borderBottomWidth: 1,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(20),
    margin: 10,
  },
  diagonalLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
    transform: [{rotate: '180deg'}],
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
  },
  socialButton: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 50,
    width: 50,
    elevation: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestButton: {
    alignSelf: 'flex-end',
    margin: 10,
  },
});

export default LoginPage;
