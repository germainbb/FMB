import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../dashboard/Dashboard'
import Save from '../dashboard/Save'

const Stack = createNativeStackNavigator()

const Casual = () => {
  return (
    <Stack.Navigator 
    initialRouteName='dash'
    screenOptions={{
      headerStyle:{
        backgroundColor: 'lightblue',
       
      },
      layout:{
        height: 10
      }  
    }}
    >
      <Stack.Screen name='dash' component={Dashboard} />
      <Stack.Screen name='save' component={Save} />
    </Stack.Navigator>
  )
}

export default Casual

const styles = StyleSheet.create({})
