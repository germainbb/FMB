import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const myposts = [
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

export default function Dashboard() {
  const navigation = useNavigation();
  const addScreen = () => {
    navigation.navigate("add");
  };
  const editScreen = () => {
    navigation.navigate("edit");
  };

  const RenderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemLogo}>
          <Image
            style={styles.itemImage}
            source={{
              uri: "https://dks.scene7.com/is/image/GolfGalaxy/18NIKMNBLKRSLBRNYLAL?qlt=70&wid=600&fmt=pjpeg",
            }}
          />
        </View>
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

  return (
    <View>
      {/* //NAME AND TWO ICONS */}
      <View style={styles.header}>
        <Text
          style={{
            flex: 4,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          NAME OF BUSINESS
        </Text>
        <TouchableOpacity
          onPress={editScreen}
          style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
        >
          <SimpleLineIcons name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={addScreen}
          style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
        >
          <Ionicons name="add-sharp" size={30} color="black" />
        </TouchableOpacity>
      </View>
      {/* //INDIVIDUAL POSTS */}
      <View>
        <FlatList
          numColumns={2}
          data={myposts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={RenderItem}
          // itemSeparatorComponent={separator}
          style={{ marginBottom: 110 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    //justifyContent: "center",
    flexDirection: "row",
    height: height * 0.08,
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  itemContainer: {
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
});
