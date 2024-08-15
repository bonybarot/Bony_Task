import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Controller} from 'react-hook-form';

interface ETextInputProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  type?: 'password' | 'text';
  rules?: object;
}

const ETextInput: React.FC<ETextInputProps> = ({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  rules,
}) => {
  const [isSecure, setIsSecure] = useState<boolean>(type === 'password');

  const toggleSecureEntry = () => {
    setIsSecure(prev => !prev);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={placeholder}
              secureTextEntry={isSecure}
              style={styles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
            {type === 'password' && (
              <TouchableOpacity onPress={toggleSecureEntry} style={styles.icon}>
                <Entypo
                  name={isSecure ? 'eye' : 'eye-with-line'}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    paddingRight: 40,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -10}],
  },
});

export default ETextInput;
