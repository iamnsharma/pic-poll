import React from 'react';
import {Image, StyleSheet, ScrollView} from 'react-native';
import {ImageSource} from '../../Constants';

function MyPhotos(): JSX.Element {
  // Dummy photo data, replace with your actual data
  const photos = [
    {id: 1, uri: ImageSource.winner},
    {id: 2, uri: ImageSource.winner},
    {id: 3, uri: ImageSource.winner},
    {id: 4, uri: ImageSource.winner},
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {photos.map(photo => (
        <Image key={photo.id} source={photo.uri} style={styles.photo} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  photo: {
    width: '48%', // Adjust as needed based on your design
    aspectRatio: 1, // Maintain aspect ratio of images
    marginBottom: 8,
  },
});

export default MyPhotos;
