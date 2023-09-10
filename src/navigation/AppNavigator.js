import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Users from '../screens/Users';
import AddUser from '../screens/AddUser';
import {Colors} from '../utils/Colors';
import Weather from '../screens/Weather';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import Images from '../utils/images';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.orange,
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <Stack.Screen
      name="Users"
      component={Users}
      options={{
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="AddUser"
      component={AddUser}
      options={{
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);

const WeatherStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.orange,
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <Stack.Screen
      name="Weather"
      component={Weather}
      options={{
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View
      style={{flexDirection: 'row', backgroundColor: '#3498db', height: 60}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const tabColor = isFocused ? '#ffffff' : '#95a5a6';

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={options.tabBarIcon}
              style={{width: 30, height: 30}}
            />
            <Text style={{color: tabColor, marginTop: 5}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: Images.homeIcon,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Weather"
          component={WeatherStack}
          options={{
            tabBarIcon: Images.lightIcon,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
