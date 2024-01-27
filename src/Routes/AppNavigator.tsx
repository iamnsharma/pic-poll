import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './RootNavigation';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}
