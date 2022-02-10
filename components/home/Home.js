import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity, Modal } from 'react-native'
import Filter from '../filterTab/Filter'
import Casual from '../casualDeals/Casual'
import Shops from '../shops/Shops'
import Dashboard from '../dashboard/Dashboard'
import Search from '../search/Search'
import { Ionicons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import Add from '../dashboard/Add'


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

const AfterLogin = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Tab.Navigator
      initialRouteName='home'
      backBehavior='initialRoute'
      screenOptions={{
        headerTitleStyle:{
          justifyContent: 'center',
        },
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
          opacity: 0.6
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
          headerRight: () => (
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-around',}}>
                <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.')
                  setModalVisible(!modalVisible)
                }}
                >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>upload image </Text>
                    <TextInput>price:</TextInput>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              <TouchableOpacity><Ionicons name="pencil" size={24} color="black" style={{marginRight:10}} /></TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(true)}><Ionicons name="add-circle-outline" size={24} color="black" style={{marginRight:10}}/></TouchableOpacity>
            </View>
          ),
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    marginTop: '70%',
    width:'80%',
    left: '10%',
    bottom: '15%'
  },
  modalView: {
    
    backgroundColor: "white",
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: "center",
  //   shadowColor: "darkorange",
  //   shadowOffset: {
  //     width: 0,
  //     height: 50
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Home
