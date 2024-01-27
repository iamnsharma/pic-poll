import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {ImageSource} from '../../Constants';
import { useNavigation } from '@react-navigation/native';

const dummyData = [
  {
    id: '1',
    name: 'John Doe',
    image: ImageSource.boy,
    totalLikes: 120,
  },
  {
    id: '2',
    name: 'Jane Smith',
    image: ImageSource.boy,
    totalLikes: 80,
  },
];

function Users(): JSX.Element {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(dummyData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = dummyData.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredUsers(filtered);
  };

  const renderItem = ({item}: {item: any}) => (
    <View style={styles.userContainer}>
      <Image source={item.image} style={styles.userImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.totalLikes}>Total Likes: {item.totalLikes}</Text>
      </View>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => handleSelect(item)}>
        <Text style={styles.selectButtonText}>Select</Text>
      </TouchableOpacity>
    </View>
  );

  const handleSelect = (user: any) => {
    // Add logic for handling user selection
    console.log('Selected User:', user);
    navigation.navigate('Battle');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search User"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    marginTop: 10,
    height: 50,
    fontSize: 18,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 5,
    color: '#000',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  totalLikes: {
    fontSize: 14,
    color: '#000',
  },
  selectButton: {
    backgroundColor: '#1877f2',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Users;
