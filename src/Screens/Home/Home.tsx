import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Drawer from '../../Components/Drawer/Drawer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addBattle} from '../../apis/api';

function Home(): React.JSX.Element {
  const navigation = useNavigation();

  const [isDrawerVisible, setDrawerVisible] = React.useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState(
    generateRandomNumbers(100),
  );

  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState(null);

  AsyncStorage.getItem('userId').then(val => setUserId(val));

  console.log(selectedNumbers, 'selectedNumbers');

  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  const numbers = [
    11, 22, 33, 2, 18, 23, 44, 55, 66, 77, 79, 86, 72, 90, 91, 92, 93,
  ];
  const handleNumberSelection = number => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(prevSelectedNumbers =>
        prevSelectedNumbers.filter(selectedNumber => selectedNumber !== number),
      );
    } else {
      if (selectedNumbers.length < 10) {
        setSelectedNumbers(prevSelectedNumbers => [
          ...prevSelectedNumbers,
          number,
        ]);
      }
    }
  };

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerLeft: () => (
        <TouchableOpacity onPress={toggleDrawer}>
          <Icon name={'menu'} size={25} color={'white'} style={{padding: 15}} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // const handleOptionPress = (screen: string) => {
  //   navigation.navigate(screen);
  // };

  const handlePressAddBattle = async () => {
    try {
      setLoading(true);

      const data = await addBattle({
        user_id: userId,
        selected_numbers: selectedNumbers,
        opened_number: selectedNumbers?.length,
      });
      setLoading(false);

      if (data?.message === 'Created Successfully!') {
        navigation.navigate('Battle');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <View style={styles.container}>
        {numbers.map(number => (
          <TouchableOpacity
            key={number}
            style={[
              styles.numberCard,
              selectedNumbers.includes(number) && styles.selectedCard,
            ]}
            onPress={() => handleNumberSelection(number)}>
            <Text
              style={[
                styles.numberText,
                selectedNumbers.includes(number) && styles.selectedText,
              ]}>
              {number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Drawer isVisible={isDrawerVisible} toggleDropdown={toggleDrawer} />
      {/* Continue Button */}
      <View style={styles.selectedNumbersContainer}>
        <Text style={styles.selectedNumbersText}>
          {selectedNumbers.join(', ')}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          // handleOptionPress('Battle');
          handlePressAddBattle();
        }}>
        <Text style={styles.continueButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const generateRandomNumbers = count => {
  const numbers = [];
  while (numbers.length < count) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  numberCard: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    elevation: 5,
  },
  selectedCard: {
    backgroundColor: '#1877f2',
  },
  numberText: {
    fontSize: 22,
    color: '#000',
  },
  selectedText: {
    color: '#fff',
  },
  selectedNumbersContainer: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  selectedNumbersText: {
    fontSize: 16,
    color: '#000',
  },
  continueButton: {
    backgroundColor: '#1877f2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 40,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Home;
