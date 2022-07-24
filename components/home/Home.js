import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import Filter from "../filterTab/Filter";
import Casual from "../casualDeals/Casual";
import Shops from "../shops/Shops";
import Dashboard from "../dashboard/Dashboard";
import myPosts from "../dashboard/MyPosts";
import Search from "../search/Search";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Add from "../dashboard/Add";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Edit from "../dashboard/Edit";
import Largeview from "../dashboard/Largeview";
import Delete from "../dashboard/Delete";
import Contact from "../dashboard/Contact";
import Workers from "../Workers/Workers";
import { createStackNavigator } from "@react-navigation/stack";
import MyPager from "../dashboard/MyPager";
import Carousel from "../dashboard/Carousel";
import { Entypo } from "@expo/vector-icons";
import Save from "../dashboard/Save";

const { width, height } = Dimensions.get("window");
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Dash = () => {
  return (
    <Stack.Navigator initialRouteName="dashboard">
      <Stack.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      />
      <Stack.Screen
        name="add"
        component={Add}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      />
      <Stack.Screen
        name="edit"
        component={Edit}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      />
      <Stack.Screen
        name="contact"
        component={Contact}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      />
      <Stack.Screen
        name="Delete"
        component={Delete}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
          presentation: 'transparentModal'
        }}
      />
    </Stack.Navigator>
  );
};
const Homer = () => {
  return (
    <Stack.Navigator initialRouteName="homer">
      <Stack.Screen
        name="homer"
        component={Filter}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="promotions"
        component={MyPager}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      /> */}
      <Stack.Screen
        name="myposts1"
        component={myPosts}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      />
      <Stack.Screen
        name="Largeview"
        component={Largeview}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
          presentation: 'transparentModal'
        }}
      />
      <Stack.Screen
        name="contact1"
        component={Contact}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      />
    </Stack.Navigator>
  );
};
const Shop = () => {
  return (
    <Stack.Navigator initialRouteName="Shops">
      <Stack.Screen
        name="Shops"
        component={Shops}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      />
      <Stack.Screen
        name="myposts2"
        component={myPosts}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      />
      <Stack.Screen
        name="contact2"
        component={Contact}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      />
    </Stack.Navigator>
  );
};
const Meetup = () => {
  return (
    <Stack.Navigator
      initialRouteName="meetup"
      screenOptions={{
        headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
      }}
    >
      <Stack.Screen
        name="meetup"
        component={Casual}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      />
      <Stack.Screen
        name="myposts3"
        component={myPosts}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      />
      <Stack.Screen
        name="contact3"
        component={Contact}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      />
    </Stack.Navigator>
  );
};
const Worker = () => {
  return (
    <Stack.Navigator
      initialRouteName="Workers"
      screenOptions={{
        headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
      }}
    >
      <Stack.Screen
        name="Workers"
        component={Workers}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      />
      <Stack.Screen
        name="myposts4"
        component={myPosts}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      />
      <Stack.Screen
        name="contact4"
        component={Contact}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#deb887", height: height * 0.06 },
        }}
      />
    </Stack.Navigator>
  );
};

const AfterLogin = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Tab.Navigator
      initialRouteName="home"
      backBehavior="initialRoute"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerTitleStyle: {
          justifyContent: "center",
        },
        tabBarShowLabel: true,
        headerShown: false,
        tabBarLabelStyle: {
          color: "darkgreen",
          marginBottom: 5,
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 5,
          borderRadius: 10,
          width: "100%",
          marginHorizontal: 5,
          height: 65,
          opacity: 0.6,
        },
      }}
    >
      <Tab.Screen
        name="promotions"
        component={MyPager}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Entypo
                name="megaphone"
                size={25}
                color={focused ? "peru": "black"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="workers"
        component={Worker}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialIcons
                name="work"
                size={25}
                color={focused ? "peru" : "black"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dash}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialIcons
                name="dashboard"
                size={24}
                color={focused ? "peru": "black"}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="home"
        component={Homer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <AntDesign
                name="home"
                size={35}
                color={focused ? "peru" : "black"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="shops"
        component={Shop}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Fontisto
                name="shopping-store"
                size={24}
                color={focused ? "peru" : "black"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="meetups"
        component={Meetup}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name="md-people-sharp"
                size={25}
                color={focused ? "peru" : "black"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name="search"
                size={25}
                color={focused ? "peru" : "black"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function Home({ navigation }) {
  return <AfterLogin />;
}

const styles = StyleSheet.create({});

export default Home;
