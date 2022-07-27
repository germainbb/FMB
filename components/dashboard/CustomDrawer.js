import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = (props) => {
  const [bname, setbname] = useState();
  const [pic, setpic] = useState();

  const userid = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    Bringposts();
  }, []);

  const Bringposts = async () => {
    const businessName = await AsyncStorage.getItem("name");
    const profilepic = await AsyncStorage.getItem("image");
    setbname(businessName);
    setpic(profilepic);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "orange" }}
      >
        <ImageBackground
          blurRadius={2}
          source={require("../../assets/money.jpg")}
          style={{ padding: 20 }}
        >
          <Image
            resizeMode="cover"
            source={{ uri: pic }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 80,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 18,

              marginBottom: 5,
            }}
          >
            {userid}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#fff",

                marginRight: 5,
              }}
            >
              {bname}
            </Text>
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Ionicons name="share-social-outline" size={22} /> */}
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              size={30}
              color="orange"
            />
            <Text
              style={{
                fontSize: 15,
                marginRight: 5,
                marginLeft: 4,
              }}
            >
              Pull Down to Refresh If The Page Is Blank
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
