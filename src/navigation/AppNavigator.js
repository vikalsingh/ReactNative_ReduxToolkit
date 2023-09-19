import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {lazy, Suspense} from 'react';
import Users from '../screens/Users';
import AddUser from '../screens/AddUser';
import {Colors} from '../utils/Colors';
import Animation from '../screens/Animation';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import Images from '../utils/images';
import DataList from '../screens/DataList';
import SearchData from '../screens/SearchData';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const DataList = lazy(() => import('../screens/DataList'));

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

const AnimationStack = () => (
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
      name="Animation"
      component={Animation}
      options={{
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);

const DataListStack = () => (
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
      name="DataList"
      component={DataList}
      options={{
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="SearchData"
      component={SearchData}
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
          name="Animation"
          component={AnimationStack}
          options={{
            tabBarIcon: Images.lightIcon,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="DataList"
          component={DataListStack}
          options={{
            tabBarIcon: Images.bellIcon,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
