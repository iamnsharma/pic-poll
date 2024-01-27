import React from 'react';
import {View, Text, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {ImageSource} from '../../Constants';

const Drawer = ({isVisible, toggleDropdown}: any) => {
  const navigation = useNavigation();

  const handleOptionPress = (screen: string) => {
    toggleDropdown();
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView>
      <Modal
        isVisible={isVisible}
        onBackdropPress={toggleDropdown}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        backdropOpacity={0.7}
        backdropColor="black"
        style={styles.modalContainer}>
        <View style={styles.dropdownContainer}>
          <View style={styles.headerOuter}>
            <View style={styles.header}>
              <Image source={ImageSource.logo} style={styles.profileImage} />
            </View>
            <Text style={styles.titleLogo}>Pic Poll</Text>
          </View>
          <View style={styles.navigationViewContainer}>
            <TouchableOpacity
              style={styles.navigationViewItemContainer}
              onPress={() => handleOptionPress('Battle')}>
              <Ionicons
                name="trophy-outline"
                size={23}
                color={'#1877f2'}
                style={{padding: 7}}
              />
              <Text style={styles.navigationViewItemText}>Battle</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navigationViewItemContainer}
              onPress={() => handleOptionPress('Wallet')}>
              <Ionicons
                name="wallet-outline"
                size={23}
                color={'#1877f2'}
                style={{padding: 7}}
              />
              <Text style={styles.navigationViewItemText}>Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navigationViewItemContainer}
              onPress={() => handleOptionPress('Profile')}>
              <Ionicons
                name="person-outline"
                size={23}
                color={'#1877f2'}
                style={{padding: 7}}
              />
              <Text style={styles.navigationViewItemText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Drawer;
