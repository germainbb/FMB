import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const listTab = [
  { status: "all" },
  { status: "purple" },
  { status: "green" },
  { status: "red" },
  { status: "black" },
];
const data = [
  {
    profileImage: "",
    caption: "",
    username: "is",
    name: "k1000",
    status: "purple",
  },
  {
    profileImage: "",
    caption: "",
    username: "billionaire",
    name: "k200",
    status: "all",
  },
  {
    profileImage: "",
    caption: "",
    username: "germain",
    name: "k500",
    status: "green",
  },
  {
    profileImage: "",
    caption: "",
    username: "is",
    name: "k100",
    status: "purple",
  },
  {
    profileImage: "",
    caption: "",
    username: "billionaire",
    name: "k200",
    status: "all",
  },
  {
    profileImage: "",
    caption: "",
    username: "germain",
    name: "k500",
    status: "green",
  },
  {
    profileImage: "",
    caption: "",
    username: "germain",
    name: "k500",
    status: "green",
  },
];
const Filter = () => {
  const [status, setstatus] = useState("all");
  const [datalist, setDatalist] = useState(data);

  const navigation = useNavigation();
  const personalScreen = () => {
    navigation.navigate("myposts1");
  };

  const setstatusFilter = (status) => {
    if (status !== "all") {
      //purple and green
      setDatalist([...data.filter((e) => e.status === status)]);
    } else {
      setDatalist(data);
    }
    setstatus(status);
  };
  const renderItem = ({ item, index }) => {
    return (
      <View key={`View_${index}`} style={styles.itemContainer}>
        <View style={styles.profile}>
          <Image
            style={styles.profileImage}
            source={{
              uri: "https://dks.scene7.com/is/image/GolfGalaxy/18NIKMNBLKRSLBRNYLAL?qlt=70&wid=600&fmt=pjpeg",
            }}
          />
          <Text>shoprite</Text>
        </View>
        <TouchableOpacity onPress={personalScreen} style={styles.itemLogo}>
          <Image
            style={styles.itemImage}
            source={{
              uri: "https://dks.scene7.com/is/image/GolfGalaxy/18NIKMNBLKRSLBRNYLAL?qlt=70&wid=600&fmt=pjpeg",
            }}
          />
        </TouchableOpacity>
        <View style={styles.itemBody}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity>
            <Feather name="heart" size={24} color="skyblue" />
            <Text>10m</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.itemStatus,
            {
              backgroundColor: item.status === "purple" ? "purple" : "#69c080",
            },
          ]}
        >
          <Text>{item.status}</Text>
        </View>
      </View>
    );
  };
  const separator = () => {
    return <View style={{ height: 1, backgroundColor: "pink" }}></View>;
  };

  return (
    <View style={{ margin: 5 }}>
      <ScrollView horizontal>
        <View style={styles.listTab}>
          {listTab.map((e) => (
            <TouchableOpacity
              key={e.status}
              style={[
                styles.btnTab,
                status === e.status && styles.btnTabActive,
              ]}
              onPress={() => setstatusFilter(e.status)}
            >
              <Text
                style={[
                  styles.textTab,
                  status === e.status && styles.textTabActive,
                ]}
              >
                {e.status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <FlatList
        numColumns={2}
        data={datalist}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        itemSeparatorComponent={separator}
        style={{ marginBottom: 110 }}
      />
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    //marginBottom: 20
  },
  btnTab: {
    width: Dimensions.get("window").width / 4,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "black",
    padding: 10,
    justifyContent: "center",
  },
  textTab: {
    color: "black",
    fontSize: 15,
  },
  btnTabActive: {
    borderBottomWidth: 4,
    borderColor: "#ff8c00",
  },
  textTabActive: {
    color: "#ff8c00",
  },
  itemContainer: {
    //padding: 2,
    width: "50%",
    marginHorizontal: 3,
    backgroundColor: "white",
    marginBottom: 5,
  },
  itemLogo: {
    padding: 10,
  },
  itemImage: {
    width: 120,
    height: 150,
  },
  itemBody: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "flex-end",
  },
  itemStatus: {
    backgroundColor: "green",
    justifyContent: "center",
    padding: 3,
  },
  profileImage: {
    borderRadius: 9,
    width: 20,
    height: 20,
    margin: 3,
  },
  profile: {
    flexDirection: "row",
  },
});
