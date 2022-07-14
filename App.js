//import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Alert,
} from "react-native";
//import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
// //import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItem,
//   DrawerItemList
// } from '@react-navigation/drawer'
// import { Ionicons } from '@expo/vector-icons'
// import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./components/home/Home";
import Save from "./components/dashboard/Save";
import MyPager from "./components/dashboard/MyPager";
//import Search from './components/Search'
import LoginScreen from "./components/login/LoginScreen";
import Signin from "./components/login/Signin";
import Filter from "./components/filterTab/Filter";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from "./reduxTK/store/Index";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import Arrange from "./components/dashboard/Arrange";
//import { useFonts, Nunito_300Light } from "@expo-google-fonts/Nunito";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./components/dashboard/firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./components/dashboard/firebase";
import Authnavigation from "./components/login/Authnavigation";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Find My Business" component={Home} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [error, seterror] = useState("");
  const [currentuser, setcurrentuser] = useState(null);



  return (
    <Provider store={store}>
    <View style={styles.container}>
    
      {currentuser !== null ? (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="FMB" component={MyDrawer} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="signing in"
            screenOptions={{
              headerShown: false,
              headerStyle: {
                display: "flex",
                flexDirection: "row",
                backgroundColor: "orange",
              },
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen
              name="FMB"
              component={MyDrawer}
              options={{
                headerTitleStyle: {
                  margin: 8,
                },
              }}
            />
            <Stack.Screen
              name="FMB sign up"
              component={LoginScreen}
              options={{
                headerShown: true,
                headerTitleStyle: {
                  margin: 8,
                },
              }}
            />
            <Stack.Screen
              name="signing in"
              component={Signin}
              options={{
                headerShown: true,
                headerTitleStyle: {
                  margin: 8,
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    //fontFamily: "Nunito_300Light",
  },
});
