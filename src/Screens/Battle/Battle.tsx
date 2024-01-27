import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Drawer from '../../Components/Drawer/Drawer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {ImageSource} from '../../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import Detail from './Detail';
import {getAllBattle} from '../../apis/api';

// Sample data for recent winners
const recentWinnersData = [
  {id: '1', image: ImageSource.winner, name: 'John Doe', likes: 15},
  {id: '2', image: ImageSource.winner, name: 'Jane Smith', likes: 12},
  // Add more entries as needed
];

function Battle(): React.JSX.Element {
  const [isDrawerVisible, setDrawerVisible] = React.useState(false);
  const [allBattle, setAllBattle] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const refRBSheet = useRef();

  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Battle',
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

  const [totalMatch, setTotalMatch] = useState(null);
  const [userName, setUserName] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);

  const renderWinnerItem = ({item}) => (
    console.log(item?.user_id?.email, 'item'),
    (
      <View style={styles.winnerItem}>
        <View style={styles.winnerDetails}>
          <Image source={ImageSource?.girl} style={styles.winnerImage} />
          <Text style={styles.winnerName}>{item?.user_id?.email}</Text>
          <View style={styles.likeViewContainer}>
            <Text
              style={[styles.likeCountL, item?.win_status && {color: 'green'}]}>
              {item.selected_numbers?.length}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => {
              refRBSheet.current.open();
              setTotalMatch(item.selected_numbers?.length);
              setUserName(item?.user_id?.email);
              setSelectedNumber(item.selected_numbers);
            }}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* Recent Winners */}
      <View style={styles.recentWinners}>
        {/* List of recent winners */}
        <FlatList
          data={allBattle?.data?.battles}
          keyExtractor={item => item.id}
          renderItem={renderWinnerItem}
        />
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={320}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <Detail
          totalMatch={totalMatch}
          userName={userName}
          selectedNumber={selectedNumber}
        />
      </RBSheet>
      <Drawer isVisible={isDrawerVisible} toggleDropdown={toggleDrawer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1877f2',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  photoContainer: {
    alignItems: 'center',
  },
  photo: {
    width: 150,
    height: 130,
    borderRadius: 10,
    marginBottom: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 5,
    color: '#1877f2',
    fontSize: 20,
    fontWeight: '800',
  },
  likeCountL: {
    marginLeft: 5,
    color: 'red',
    fontSize: 16,
    fontWeight: '800',
  },
  vsContainer: {
    // alignItems: 'center',
    // position: 'absolute',
    right: '22%',
    bottom: '6%',
    zIndex: 1,
    width: 30,
  },
  vsImage: {
    width: 120,
    height: 100,
  },
  remainingTime: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 40,
    color: '#1877f2',
    fontWeight: 'bold',
  },
  recentWinners: {
    flex: 1,
  },
  recentWinnersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  winnerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    elevation: 5,
    padding: 10,
    borderRadius: 10,
  },
  winnerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  winnerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  winnerName: {
    fontSize: 12,
    // fontWeight: 'bold',
    color: '#000',
  },
  likeViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  viewButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#1877f2',
  },
  viewButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Battle;
