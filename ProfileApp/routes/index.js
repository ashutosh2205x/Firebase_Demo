import * as React from 'react'

import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import HomeScreen from '../screens/Home'
import {Image, StyleSheet} from 'react-native'
import colors from '../components/colors'
import UserDetailScreen from '../screens/UserDetailScreen'
import FavUserListScreen from '../screens/FavUserList'

const MainStack = createStackNavigator()
const HomeStack = createStackNavigator()
const FavStack = createStackNavigator()

const MainTabs = createBottomTabNavigator()
// UserDetailScreen
function HomeStackSet () {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name='UserDetailScreen'
        component={UserDetailScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  )
}
function FavUserListStackSet () {
  return (
    <FavStack.Navigator>
      <FavStack.Screen
        name='FavUserListScreen'
        component={FavUserListScreen}
        options={{headerShown: false}}
      />
      <FavStack.Screen
        name='UserDetailScreen'
        component={UserDetailScreen}
        options={{headerShown: false}}
      />
    </FavStack.Navigator>
  )
}
function Tabs () {
  return (
    <MainTabs.Navigator
      initialRouteName={'HomeScreen'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'HomeScreenSet') {
            return (
              <Image
                source={require('../assets/home.png')}
                style={[focused ? customStyle.active : customStyle.inactive]}
                resizeMode='contain'
              />
            )
          } else if (route.name === 'Favourites') {
            return (
              <Image
                source={require('../assets/star_unfilled.png')}
                style={[focused ? customStyle.active : customStyle.inactive]}
                resizeMode='contain'
              />
            )
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.active,
        inactiveTintColor: colors.gray,
        labelStyle: {fontSize: 10, fontFamily: 'Montserrat-SemiBold'},
      }}>
      <MainTabs.Screen
        name='HomeScreenSet'
        component={HomeStackSet}
        options={{headerShown: false}}
      />
      <MainTabs.Screen
        name='Favourites'
        component={FavUserListStackSet}
        options={{headerShown: false}}
      />
    </MainTabs.Navigator>
  )
}

export function Routes () {
  return (
    <MainStack.Navigator initialRouteName={'HomeScreenSet'}>
      <MainStack.Screen
        name='Tabs'
        component={Tabs}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  )
}

const customStyle = StyleSheet.create({
  active: {
    tintColor: colors.active,
    height: 20,
    width: 20,
    marginTop: 5,
  },
  inactive: {
    tintColor: colors.gray,
    height: 20,
    width: 20,
    marginTop: 5,
  },
})
