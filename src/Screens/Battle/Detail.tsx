/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {ImageSource} from '../../Constants';

function Detail(props: any): JSX.Element {
  // Replace with actual user data
  console.log(props, 'props');

  const {selectedNumber, totalMatch, userName} = props;

  console.log(selectedNumber, 'selectedNumber');

  const user = {
    name: 'John Doe',
    photo: ImageSource.boy,
    totalLikes: 150,
    opponent: 'Jane Smith',
  };

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Image source={user.photo} style={styles.userPhoto} />
      </View>
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.totalLikes}>Total Battles: {totalMatch}</Text>
      <Text style={styles.opponent}>
        Selected Numbers: {selectedNumber.join(', ')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 75, // half of the width and height to make it a circle
  },
  userName: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
    color: '#000',
  },
  totalLikes: {
    fontSize: 16,
    marginTop: 10,
    color: '#000',
  },
  opponent: {
    fontSize: 16,
    marginTop: 10,
    color: '#000',
  },
});

export default Detail;
