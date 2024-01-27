import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useMemo} from 'react';
import {View, Animated} from 'react-native';
import {styles} from './styles';
import {ActivityIndicator} from 'react-native-paper';
import {ImageSource} from '../../Constants';

type RootStackParamList = {
  Phone: undefined;
};

function Splash(): JSX.Element {
  const logoOpacity = useMemo(() => new Animated.Value(0), []);
  const logoScale = useMemo(() => new Animated.Value(0), []);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Phone');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoOpacity, logoScale]);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={{
          ...styles.logo,
          opacity: logoOpacity,
          transform: [{scale: logoScale}],
        }}
        source={ImageSource.logo}
      />
      <View style={{position: 'absolute', bottom: 60}}>
        <ActivityIndicator
          size="small"
          color="#1877f2"
          style={{marginTop: 10}}
        />
      </View>
    </View>
  );
}

export default Splash;
