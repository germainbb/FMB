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
  Modal,
  TextInput,
  Pressable,
  Alert,
  Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const listTab = [
  { status: "all" },
  { status: "purple" },
  { status: "green" },
  { status: "red" },
  { status: "black" },
];
const data = [
  {
    username: "is",
    name: "k1000",
    status: "purplhdshgdgdhghshdshgdhdhghsgshshshsgshdsgdhbcbvdxgdvdgfssgfg",
  },
  {
    username: "billionaire",
    name: "k200",
    status: "all",
  },
  {
    username: "germain",
    name: "k500",
    status: "green",
  },
];

const Filter = () => {
  const [status, setstatus] = useState("all");
  const [datalist, setDatalist] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);
  const [mobile_no, setmobile_no] = useState("0776778798")

  const navigation = useNavigation();

  const onSubmit = () => {
    navigation.navigate("contact1");
    setModalVisible(!modalVisible);
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
          <Text>{item.username}</Text>
        </View>
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
          <Text numberOfLines={1} style={styles.itemName}>
            {item.name}
          </Text>
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
          <Text numberOfLines={2}>{item.status}</Text>
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
      />
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
                  <Text style={styles.textStyle}>seller details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      "http://api.whatsapp.com/send?phone=26" + mobile_no
                    );
                  }}
                  style={{ flex: 1, left: width * 0.18 }}
                >
                  <FontAwesome name="whatsapp" size={45} color="green" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
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
    height: 140,
  },
  itemBody: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
    width: 1,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flex: 1,
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
});
