import React from 'react'
import { View, Text } from 'react-native'
import Filter from '../filterTab/Filter'
import Casual from '../casualDeals/Casual'
import Shops from '../shops/Shops'
import Dashboard from '../dashboard/Dashboard'
import Search from '../search/Search'
import { Ionicons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

const AfterLogin = () => {
  return (
    <Tab.Navigator
      initialRouteName='home'
      backBehavior='initialRoute'
      screenOptions={{
        
        tabBarShowLabel: true,
        tabBarLabelStyle:{
          color: 'darkgreen',
          marginBottom:5
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 5,
          borderRadius: 10,
          width: '90%',
          left: 20,
          height: 65,
          opacity: 0.8
        }
      }}
    >
      
      <Tab.Screen
        name='search'
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons name='search' size={25} color={focused ? 'orange' : 'black'} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name='dashboard'
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialIcons name='dashboard' size={24} color={focused ? 'orange' : 'black'} />
            </View>
          )
        }}
      />

      <Tab.Screen
        name='home'
        component={Filter}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <AntDesign name='home' size={24} color= {focused ? 'orange' : 'black'} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name='shops'
        component={Shops}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Fontisto name='shopping-store' size={24} color={focused ? 'orange' : 'black'} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name='meetup'
        component={Casual}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons name='md-people-sharp' size={25} color={focused ? 'orange' : 'black'} />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  )
}

function Home ({ navigation }) {
  return <AfterLogin />
}

export default Home
