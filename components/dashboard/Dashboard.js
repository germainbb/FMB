import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

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
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = () => {
    setModalVisible(!modalVisible);
  };

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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.itemLogo}>
            <Image
              resizeMode="contain"
              style={styles.itemImage}
              source={{
                uri: "https://dks.scene7.com/is/image/GolfGalaxy/18NIKMNBLKRSLBRNYLAL?qlt=70&wid=600&fmt=pjpeg",
              }}
            />
          </View>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{ marginLeft: width * 0.5, bottom: 10 }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <FontAwesome name="times" size={30} color="black" />
              </TouchableOpacity>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{
                  uri: "https://dks.scene7.com/is/image/GolfGalaxy/18NIKMNBLKRSLBRNYLAL?qlt=70&wid=600&fmt=pjpeg",
                }}
              />
              <View style={styles.itembody}>
                <Text style={styles.itemPrice}>K30,00</Text>
                <TouchableOpacity style={{ left: width * 0.19 }}>
                  <Feather name="heart" size={24} color="skyblue" />
                  <Text>10m</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.modalText}>name of object </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                description frtew hhhfhhfd uhudhfisbs ucduhussigdhhfyrjuu
                fgrhyhsgd tuqwerty qwerty lorem ipsum hejddjfsj hejddjfsjfgda
                fnc ddhdhsj hfhh righth germainge germain germain germain
              </Text>
              <View style={styles.contact}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={onSubmit}
                >
                  <Text style={styles.textStyle}>Delete this post</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
      {/* //INDIVIDUAL POSTS */}
      <View>
        <FlatList
          numColumns={2}
          data={myposts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={RenderItem}
          // itemSeparatorComponent={separator}
          style={{ marginBottom: 190 }}
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
  image: {
    width: width * 0.6,
    height: height * 0.45,
  },
  itembody: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  itemPrice: {
    fontWeight: "bold",
    right: width * 0.19,
  },
  contact: {
    flexDirection: "row",
    display: "flex",
    top: 6,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flex: 1,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    //backgroundColor: "black",
    alignItems: "center",
    marginTop: "70%",
    width: "80%",
    left: "10%",
    bottom: "15%",
  },
  modalView: {
    display: "flex",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "darkorange",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
