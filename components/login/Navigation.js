// import { View, Text } from "react-native";
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Home from "../home/Home";
// //import LoginScreen from "./components/login/LoginScreen";

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
// const { width, height } = Dimensions.get("window");
// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Find My Business" component={Home} />
//     </Drawer.Navigator>
//   );
// }

// // const Navigation = () => {
// export const SignedInStack = () => {
//   <NavigationContainer>
//     <Stack.Navigator>
//       <Stack.Screen name="FMB" component={MyDrawer} />
//     </Stack.Navigator>
//   </NavigationContainer>;

//   // <NavigationContainer>
//   //     <Stack.Navigator
//   //      initialRouteName="FMB"
//   //      screenOptons={{
//   //             headerShown: false,
//   //      }}
//   //     >

//   //         <Stack.Screen
//   //           name="FMB"
//   //           component={MyDrawer}
//   //           options={{
//   //             headerTitleStyle: {
//   //               margin: 8,
//   //             },
//   //           }}
//   //         />
//   //         <Stack.Screen
//   //           name="FMB login"
//   //           component={LoginScreen}
//   //           options={{
//   //             headerShown: true,
//   //             headerTitleStyle: {
//   //               margin: 8,
//   //             },
//   //           }}
//   //         />
//   //     </Stack.Navigator>
//   // </NavigationContainer>
// };
// export const SignedOutStack = () => {
//   <NavigationContainer>
//     <Stack.Navigator
//       initialRouteName="FMB login"
//       screenOptions={{
//         headerShown: false,
//         headerStyle: {
//           display: "flex",
//           flexDirection: "row",
//           backgroundColor: "orange",
//         },
//         headerTitleAlign: "center",
//       }}
//     >
//       <Stack.Screen
//         name="FMB"
//         component={MyDrawer}
//         options={{
//           headerTitleStyle: {
//             margin: 8,
//           },
//         }}
//       />
//       <Stack.Screen
//         name="FMB login"
//         component={LoginScreen}
//         options={{
//           headerShown: true,
//           headerTitleStyle: {
//             margin: 8,
//           },
//         }}
//       />
//     </Stack.Navigator>
//   </NavigationContainer>;

//   // <NavigationContainer>
//   //   <Stack.Navigator
//   //     initialRouteName="FMB login"
//   //     screenOptons={{
//   //       headerShown: false,
//   //     }}
//   //   >
//   //     <Stack.Screen
//   //       name="FMB login"
//   //       component={LoginScreen}
//   //       options={{
//   //         headerShown: true,
//   //         headerTitleStyle: {
//   //           margin: 8,
//   //         },
//   //       }}
//   //     />
//   //   </Stack.Navigator>
//   // </NavigationContainer>;
// };
