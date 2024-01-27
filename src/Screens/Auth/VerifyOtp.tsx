/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {ImageSource} from '../../Constants';
import OtpInputs from 'react-native-otp-inputs';
import {useNavigation} from '@react-navigation/native';
import {verifyOTP} from '../../apis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function VerifyOtp({route}): React.JSX.Element {
  const {email} = route.params;
  const [otp, setOtp] = useState(null);
  console.log(email, otp, 'email from phone');

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // const handleNextPress = async () => {
  //   navigation.navigate('Gender');
  // };

  const handleNextPress = async () => {
    try {
      setLoading(true);

      const data = await verifyOTP({email: email, otp: otp});
      setLoading(false);

      await AsyncStorage.setItem('userId', data?.id);
      if (data.token) {
        navigation.navigate('Dashboard');
      } else {
        navigation.navigate('Gender');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.dotsContainer}>
        <Text style={styles.dot}></Text>
        <Text style={styles.activeDot}></Text>
        <Text style={styles.dot}></Text>
      </View> */}

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <View style={styles.logoContainer}>
        <Image source={ImageSource.logo} style={styles.logo} />
      </View>
      <View style={styles.phoneContainer}>
        <Text style={styles.label}>Enter your OTP to login</Text>
        <OtpInputs
          handleChange={code => setOtp(code)}
          numberOfInputs={4}
          style={styles.otpInputs}
          inputStyles={styles.otpInput}
        />
        <Text style={styles.label1}>Resend OTP</Text>
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
  label1: {
    marginBottom: 15,
    fontSize: 17,
    color: '#1877f2',
    fontWeight: '600',
    textAlign: 'center',
  },
  otpInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    marginTop: 6,
    height: 40,
    width: 60,
    fontSize: 17,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 5,
    marginHorizontal: 0,
    color: '#000',
  },
  sendOtpButton: {
    backgroundColor: '#1877f2',
    paddingVertical: 10,
    borderRadius: 50,
    // marginBottom: 130,
    marginTop: 20,
    textAlign: 'center',
  },
  sendOtpText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default VerifyOtp;
