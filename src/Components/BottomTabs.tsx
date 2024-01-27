import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home';
import Profile from '../Screens/Profile/Profile';
import Battle from '../Screens/Battle/Battle';
import Wallet from '../Screens/Wallet/Wallet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Users from '../Screens/Users/Users';

const Tab = createBottomTabNavigator();

function BottomTabs(): JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
          fontFamily: 'Roboto-Regular',
        },
        tabBarStyle: {
          display: 'flex',
          height: 50,
        },
        tabBarActiveTintColor: '#1877f2', // Set the active tab text color
        headerStyle: {
          backgroundColor: '#1877f2', // Set your desired header color
        },
        headerTintColor: '#fff', // Set the text color of the header
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarIcon: ({color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline'; // Replace with the actual icon name
          } else if (route.name === 'Profile') {
            iconName = 'person-outline'; // Replace with the actual icon name
          } else if (route.name === 'Battle') {
            iconName = 'trophy-outline'; // Replace with the actual icon name
          } else if (route.name === 'Wallet') {
            iconName = 'wallet-outline'; // Replace with the actual icon name
          }

          // You can return any component here as the icon
          return (
            <Ionicons
              name={iconName}
              size={22}
              color={color}
              style={{marginTop: 4}}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Battle"
        component={Battle}
        options={{
          tabBarLabel: 'Battle',
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarLabel: 'Wallet',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen
        name="Users"
        component={Users}
        options={isFocused => ({
          tabBarButton: () => null,
          headerShown: false,
          tabBarLabel: '',
          headerStyle: {
            backgroundColor: isFocused ? '#1877f2' : 'white',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          tabBarIcon: ({focused}) => (
            <TabBarIcon tabBarIcon={'none'} isFocused={focused} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
