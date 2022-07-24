import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
//import React, { useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { orderBy, collection, doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../components/dashboard/firebase";
import { ref, deleteObject } from "firebase/storage";

const { width, height } = Dimensions.get("window");

const Delete = (props) => {
  const navigation = useNavigation();
  const userid = useSelector((state) => state.user.currentUser);
  const item = props.route.params;
  const onSubmit = async () => {
    await deleteDoc(doc(db, "users", userid, "posts", item.key)).then(
      Alert.alert("post deleted")
    ).catch(Alert.alert("something went wrong"))
    
    // Create a reference to the file to delete
const desertRef = ref(storage, '${userid}/${item.name}');

// Delete the file
deleteObject(desertRef).then(() => {
  // File deleted successfully
  Alert.alert("post deleted")
}).catch((error) => {
  // Uh-oh, an error occurred!
  Alert.alert("something went wrong")
});

    navigation.navigate("dashboard");
  };
  const onclose = () => {
    navigation.navigate("dashboard");
  };

  return (
    <ScrollView>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={{
              bottom: 10,
              display: "flex",
              bottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            onPress={() => onclose()}
          >
            <Text style={{ display: "flex", flex: 1 }}>
              {item.timestamp.toDate().toLocaleString("en")}
            </Text>
            <FontAwesome name="times" size={30} color="black" />
          </TouchableOpacity>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri: item.profileImage,
            }}
          />
          <View style={styles.itembody}>
            <Text style={styles.itemPrice}>K {item.price}</Text>
          </View>
          <Text style={styles.modalText}>{item.name} </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {item.description}
          </Text>
          <View style={styles.contact}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => onSubmit()}
            >
              <Text style={styles.textStyle}>Delete this post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Delete;

const styles = StyleSheet.create({
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
  image: {
    width: width * 0.7,
    height: height * 0.5,
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
});
