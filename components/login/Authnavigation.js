// //import { StatusBar } from 'expo-status-bar';
// import {
//     StyleSheet,
//     Text,
//     View,
//     TouchableOpacity,
//     TouchableHighlight,
//     Dimensions,
//     Alert,
//   } from "react-native";
//   //import { createStackNavigator } from '@react-navigation/stack'
//   import React, { useState, useEffect } from "react";
// //   import { NavigationContainer } from "@react-navigation/native";
//   import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//   import Home from "../home/Home";
  
//   //import Search from './components/Search'
  
//   import { createNativeStackNavigator } from "@react-navigation/native-stack";
// //   //import { store } from "./reduxTK/store/Index";
// //   import { Provider } from "react-redux";
// //   import { useDispatch, useSelector } from "react-redux";
// //   import Arrange from "./components/dashboard/Arrange";
//   //import { useFonts, Nunito_300Light } from "@expo-google-fonts/Nunito";
  
//   import { createDrawerNavigator } from "@react-navigation/drawer";
//   import AsyncStorage from "@react-native-async-storage/async-storage";
//   import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//   } from "firebase/auth";
//   import { auth } from "../dashboard/firebase";
//   import { collection, addDoc } from "firebase/firestore";
//   import { db } from "../dashboard/firebase"    
//   import {SignedInStack, SignedOutStack} from './Navigation'
  
//   const Stack = createNativeStackNavigator();
//   const Tab = createBottomTabNavigator();
//   const { width, height } = Dimensions.get("window");
  
//   const Drawer = createDrawerNavigator();
  
//   function MyDrawer() {
//     return (
//       <Drawer.Navigator>
//         <Drawer.Screen name="Find My Business" component={Home} />
//       </Drawer.Navigator>
//     );
//   }
  
//   export default function App() {
//     const [error, seterror] = useState("");
//     const [currentuser, setcurrentuser] = useState(null);
  
//     const userHandler = (user) => {
//       user ? setcurrentuser(user) : setcurrentuser(null);
//     }
  
//     useEffect(() => {
//       async () => {
//         try {
//           const emaill = await AsyncStorage.getItem("Email");
//           const pass = await AsyncStorage.getItem("Password");
//           if (emaill !== null && pass !== null) {
//             // value previously stored
//             const handleSignIn = async () => {
//               signInWithEmailAndPassword(auth, emaill, pass)
//                 .then(async (userCredential) => {
//                   console.log("signed in");
//                   const user = userCredential.user;
//                   userHandler(user);
//                   console.log(user);
//                   await addDoc(collection(db, "users"), {
//                     email: emaill,
//                   })
//                     .then(() => console.log("this is the email"))
//                     .catch(() => {
//                       console.log("rejected");
//                     });
  
//                   navigation.navigate("FMB");
//                 })
//                 .catch((error) => {
//                   console.log(error);
//                 });
//             };
            
//           } else {
//             console.log("no data");
//           }
//         } catch (e) {
//           // error reading value
//           console.log(e)
//         }
//       };
//     }, []);
  
//     return (
//       <View>
//         {currentuser ? ( <SignedInStack />) : ( <SignedOutStack />)}
//       </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//       backgroundColor: "#fff",
//       flex: 1,
//       //fontFamily: "Nunito_300Light",
//     },
//   });
  
//         {/* {currentuser !== null ? (
//           <NavigationContainer>
//             <Stack.Navigator>
//               <Stack.Screen name="FMB" component={MyDrawer} />
//             </Stack.Navigator>
//           </NavigationContainer>
//         ) : (
//           <NavigationContainer>
//             <Stack.Navigator
//               initialRouteName="FMB login"
//               screenOptions={{
//                 headerShown: false,
//                 headerStyle: {
//                   display: "flex",
//                   flexDirection: "row",
//                   backgroundColor: "orange",
//                 },
//                 headerTitleAlign: "center",
//               }}
//             >
//               <Stack.Screen
//                 name="FMB"
//                 component={MyDrawer}
//                 options={{
//                   headerTitleStyle: {
//                     margin: 8,
//                   },
//                 }}
//               />
//               <Stack.Screen
//                 name="FMB login"
//                 component={LoginScreen}
//                 options={{
//                   headerShown: true,
//                   headerTitleStyle: {
//                     margin: 8,
//                   },
//                 }}
//               />
//             </Stack.Navigator>
//           </NavigationContainer>
//         )} */}