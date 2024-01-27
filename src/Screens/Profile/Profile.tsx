import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Drawer from '../../Components/Drawer/Drawer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {ImageSource} from '../../Constants';
import {getAllBattle} from '../../apis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile(): React.JSX.Element {
  const [isDrawerVisible, setDrawerVisible] = React.useState(false);
  const [allBattle, setAllBattle] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  AsyncStorage.getItem('userId').then(val => setUserId(val));

  console.log(allBattle?.data?.battles, 'allBattle is here');

  const navigation = useNavigation();

  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Profile',
      headerLeft: () => (
        <TouchableOpacity onPress={toggleDrawer}>
          <Icon name={'menu'} size={25} color={'white'} style={{padding: 15}} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getAllBattle();
        setAllBattle(data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const currentUserBattles = allBattle?.data?.battles?.filter(
    (battle: any) => battle?.user_id?.id === userId,
  );
  const battlesWon = currentUserBattles?.filter(
    (battle: any) => battle.win_status,
  ).length;
  const battlesLost = currentUserBattles?.length - battlesWon;

  const currentUserEmail =
    currentUserBattles?.length > 0 ? currentUserBattles[0]?.user_id?.email : '';

  console.log(
    currentUserBattles,
    battlesWon,
    battlesLost,
    'currentUserBattles',
  );

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <View style={styles.profileContainer}>
        <Image source={ImageSource.girl} style={styles.profileImage} />
        <Text style={styles.profileName}>{currentUserEmail}</Text>
        {/* <Text style={styles.mobileNumber}>{currentUserEmail}</Text> */}
      </View>

      {/* Followers, Following, Likes Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          {/* <Icon name={'heart'} size={25} color={'#1877f2'} /> */}
          <Text style={styles.statTitle}>Total</Text>
          <Text style={styles.statNumber}>{currentUserBattles?.length}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statTitle}>Win</Text>
          <Text style={styles.statNumber}>{battlesWon}</Text>
        </View>
        <View style={styles.statItem}>
          {/* <Icon name={'user-plus'} size={25} color={'#1877f2'} /> */}
          <Text style={styles.statTitle}>Loss</Text>
          <Text style={styles.statNumber}>{battlesLost}</Text>
        </View>
      </View>

      {/* Buttons Section */}
      {/* <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Photos')}}>
        <Icon
          name={'image'}
          size={22}
          color={'white'}
          style={{marginRight: 15}}
        />
        <Text style={styles.buttonText}>My Photos</Text>
        <Icon
          name={'chevron-right'}
          size={22}
          color={'white'}
          style={{position: 'absolute', right: 10}}
        />
      </TouchableOpacity> */}

      {/* <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Battles')}}>
        <Icon
          name={'activity'}
          size={22}
          color={'white'}
          style={{marginRight: 15}}
        />
        <Text style={styles.buttonText}>My Battles</Text>
        <Icon
          name={'chevron-right'}
          size={22}
          color={'white'}
          style={{position: 'absolute', right: 10}}
        />
      </TouchableOpacity> */}

      {/* <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Manage Profile')}}>
        <Icon
          name={'edit'}
          size={22}
          color={'white'}
          style={{marginRight: 15}}
        />
        <Text style={styles.buttonText}>Update Profile</Text>
        <Icon
          name={'chevron-right'}
          size={22}
          color={'white'}
          style={{position: 'absolute', right: 10}}
        />
      </TouchableOpacity> */}

      <Drawer isVisible={isDrawerVisible} toggleDropdown={toggleDrawer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
    color: '#000',
  },
  mobileNumber: {
    marginTop: 5,
    color: '#000',
  },
  statTitle: {
    marginTop: 5,
    color: '#1877f2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statNumber: {
    marginTop: 5,
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 30,
    width: '90%',
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '30%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1877f2',
    paddingVertical: 11,
    paddingHorizontal: 13,
    borderRadius: 30,
    marginTop: 15,
    width: '90%',
    position: 'relative',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'left',
  },
});

export default Profile;
