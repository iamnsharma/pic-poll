import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home/Home';
import Profile from '../Screens/Profile/Profile';
import DashBoard from '../Screens/DashBoard/Dashboard';
import Wallet from '../Screens/Wallet/Wallet';
import Battle from '../Screens/Battle/Battle';
import Splash from '../Screens/Splash/Splash';
import Phone from '../Screens/Auth/Phone';
import VerifyOtp from '../Screens/Auth/VerifyOtp';
import Gender from '../Screens/Auth/Gender';
import MyPhotos from '../Screens/MyPhotos/MyPhotos';
import Battles from '../Screens/Battle/Balltes';
import UpdateProfile from '../Screens/Profile/UpdateProfile';
import Users from '../Screens/Users/Users';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      // initialRouteName="VerifyOTP"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1877f2', // Set your desired header color
        },
        headerTintColor: '#fff', // Set the text color of the header
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Users"
        component={Users}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Phone"
        component={Phone}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VerifyOTP"
        component={VerifyOtp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Gender"
        component={Gender}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashBoard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Photos"
        component={MyPhotos}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Manage Profile"
        component={UpdateProfile}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Battles"
        component={Battles}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Battle"
        component={Battle}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
