/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {ImageSource} from '../../Constants';
import {useNavigation} from '@react-navigation/native';
import {sendOTP} from '../../apis/api';

function Phone(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleNextPress = async () => {
    try {
      setLoading(true);
      const data = await sendOTP(email);
      setLoading(false);
      if (data.status === 'success') {
        navigation.navigate('VerifyOTP', {email: email});
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.dotsContainer}>
        <Text style={styles.activeDot} />
        <Text style={styles.dot} />
        <Text style={styles.dot} />
      </View> */}

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <View style={styles.logoContainer}>
        <Image source={ImageSource.logo} style={styles.logo} />
      </View>
      <View style={styles.phoneContainer}>
        <Text style={styles.label}>Enter your email to get otp</Text>
        <TextInput
          value={email}
          placeholder="Enter your email"
          style={styles.phoneInput}
          onChangeText={text => setEmail(text)}
        />
        <TouchableOpacity
          style={styles.sendOtpButton}
          onPress={handleNextPress}>
          <Text style={styles.sendOtpText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 180,
  },
  dot: {
    marginHorizontal: 5,
    color: '#666',
    borderColor: '#d6d6d6',
    backgroundColor: '#d6d6d6',
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  activeDot: {
    marginHorizontal: 5,
    color: '#fff',
    borderColor: '#1877f2',
    backgroundColor: '#1877f2',
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  logoContainer: {
    marginBottom: 64,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
  },
  phoneContainer: {
    width: '80%',
  },
  label: {
    marginBottom: 15,
    fontSize: 17,
    color: '#3b4045',
    fontWeight: '600',
    textAlign: 'center',
  },
  phoneInput: {
    marginTop: 6,
    height: 45,
    fontSize: 17,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 5,
    color: '#000',
  },
  sendOtpButton: {
    backgroundColor: '#1877f2',
    paddingVertical: 10,
    borderRadius: 50,
    // marginBottom: 150,
    marginTop: 40,
    textAlign: 'center',
  },
  sendOtpText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Phone;
