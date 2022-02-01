//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
//import { createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react'
//import { StyleSheet, View, ImageBackground, Button } from 'react-native'
//import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
// //import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItem,
//   DrawerItemList
// } from '@react-navigation/drawer'
// import { Ionicons } from '@expo/vector-icons'
// import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './components/home/Home'
//import Search from './components/Search'
//import LoginScreen from './components/login/LoginScreen'
import Filter from './components/filterTab/Filter'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const AfterLogin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Settings' component={Search} />
    </Tab.Navigator>
  )
}

export default function App () {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName='FMB' 
        screenOptions={{
          headerTitleStyle:{
            marginHorizontal: '7', 
            
          }
        }}>
          <Stack.Screen 
          name='FMB' 
          component={Home} 
          options={{
            headerTitleStyle:{
              margin: 8
            }
          }} 
          />
          <Stack.Screen 
          name='home' 
          component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
})
