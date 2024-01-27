import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {ImageSource} from '../../Constants';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateUser} from '../../apis/api';

function Gender(): React.JSX.Element {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState('');
  const [userId, setUserId] = useState(null);

  AsyncStorage.getItem('userId').then(val => setUserId(val));

  const handleNextPress = () => {
    // Perform any necessary action with the selected gender
    // For now, navigate to the VerifyOTP screen
    navigation.navigate('Dashboard');
  };

  const handlePressGender = async () => {
    try {
      const data = await updateUser({gender: selectedGender, userId: userId});
      console.log(data, 'data');
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.dotsContainer}>
        <Text style={styles.dot} />
        <Text style={styles.dot} />
        <Text style={styles.activeDot} />
      </View> */}
      {/* <View style={styles.logoContainer}>
        <Image source={ImageSource.logo} style={styles.logo} />
      </View> */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderIcon,
            selectedGender === 'male' && styles.selectedGender,
          ]}
          onPress={() => {
            setSelectedGender('male');
            handlePressGender();
          }}>
          <Image source={ImageSource.girl} style={styles.genderIconImage} />
          <Text style={styles.genderLabel}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderIcon,
            selectedGender === 'female' && styles.selectedGender,
          ]}
          onPress={() => {
            setSelectedGender('female');
            handlePressGender();
          }}>
          <Image source={ImageSource.boy} style={styles.genderIconImage} />
          <Text style={styles.genderLabel}>Female</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.phoneContainer}>
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
    marginBottom: 100,
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
    marginBottom: 50,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  genderIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    margin: 10,
    backgroundColor: '#fff',
  },
  selectedGender: {
    borderColor: '#1877f2',
  },
  genderIconImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  genderLabel: {
    marginTop: 8,
    color: '#3b4045',
    fontWeight: '600',
    fontSize: 17,
  },
  phoneContainer: {
    width: '80%',
  },
  label: {
    marginBottom: 15,
    fontSize: 18,
    color: '#3b4045',
    fontWeight: '800',
    textAlign: 'center',
  },
  phoneInput: {
    marginTop: 6,
    height: 50,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  sendOtpButton: {
    backgroundColor: '#1877f2',
    paddingVertical: 10,
    borderRadius: 50,
    // marginBottom: 150,
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

export default Gender;
