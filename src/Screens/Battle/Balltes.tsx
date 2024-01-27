import React, {useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import Drawer from '../../Components/Drawer/Drawer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {ImageSource} from '../../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import Detail from './Detail';

// Sample data for recent winners
const recentWinnersData = [
  {id: '1', image: ImageSource.winner, name: 'John Doe', likes: 15},
  {id: '2', image: ImageSource.winner, name: 'Jane Smith', likes: 12},
  // Add more entries as needed
];

function Battles(): React.JSX.Element {
  const [isDrawerVisible, setDrawerVisible] = React.useState(false);
  const navigation = useNavigation();
  const refRBSheet = useRef();

  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  const renderWinnerItem = ({item}) => (
    <View style={styles.winnerItem}>
      <View style={styles.winnerDetails}>
        <Image source={item.image} style={styles.winnerImage} />
        <Text style={styles.winnerName}>{item.name}</Text>
        <View style={styles.likeViewContainer}>
          <Ionicons name={'heart-outline'} size={23} color={'#1877f2'} />
          <Text style={styles.likeCountL}>{item.likes}</Text>
        </View>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => refRBSheet.current.open()}>
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Recent Winners */}
      <View style={styles.recentWinners}>
        {/* List of recent winners */}
        <FlatList
          data={recentWinnersData}
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
        <Detail />
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
    fontSize: 18,
    fontWeight: 'bold',
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

export default Battles;
