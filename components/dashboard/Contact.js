import {
  View,
  Button,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { db } from "../../components/dashboard/firebase";
import {
  orderBy,
  collection,
  updateDoc,
  doc,
  getDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
//import { updateDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Contact(props) {
  const [details, setdetails] = useState();
  const [show, setshow] = useState(false);

  //console.log(props)
  const navigation = useNavigation();

  const done = () => {
    navigation.goBack("home");
  };
  useLayoutEffect(() => {
    setshow(true);

    Bringdoc();
  }, []);

  const userid = useSelector((state) => state.user.currentUser);
  //console.log(userid)
  const id = props.route.params;
  const user = props.route.params !== undefined ? id : userid

  const Bringdoc = async () => {
    const docsnap = await getDoc(doc(db, "users", user));

    if (docsnap.exists()) {
      //console.log("Document data:", docsnap.data());
      //Object.assign(obj,docsnap.data())
      setdetails({ ...docsnap.data() });
      console.log("Details", details);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    setshow(false);
  };

  //const id = props? user : useri

  const handlelikes = async () => {
    const status = !details.likes.includes(userid);
    await updateDoc(doc(db, "users", details.email), {
      likes: status ? arrayUnion(userid) : arrayRemove(userid),
    })
      .then(() =>
        Bringdoc(),
        Alert.alert(" Thank you!!😍🙏")
      )
      .catch(() => {
        () => Alert.alert("Oops", "try again buddy");
      });
  };

  return (
    <ScrollView>
      <View style={{ marginBottom: 75 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 30, padding: 6, color: "green", fontFamily: "" }}
          >
            contact details
          </Text>
          {show === true ? (
            <ActivityIndicator size="large" color="orange" />
          ) : (
            <TouchableOpacity onPress={() => Bringdoc()}>
              <Text
                style={{
                  fontSize: 10,
                  padding: 6,
                  color: "orange",
                  fontFamily: "",
                }}
              >
                Refresh
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={ handlelikes}
          style={{ left: 20, flexDirection: "row", display: "flex" }}
        >
          {details !== undefined && details.likes.includes(userid)  ? (
            <AntDesign name="heart" size={30} color="red" style={{ flex: 1, display: "flex" }}/>
          ) : (
            <Feather
              name="heart"
              size={30}
              color="skyblue"
              style={{ flex: 1, display: "flex" }}
            />
          )}

          {details !== undefined && (
            <Text style={styles.likes}>
              {details.likes.length.toLocaleString("en")} people like this
              business
            </Text>
          )}
        </TouchableOpacity>
        <Text style={styles.input}>Business name</Text>
        {details !== undefined && (
          <Text selectable style={styles.text}>
            {details.name}
          </Text>
        )}
        <Text style={styles.input}>business description</Text>
        {details !== undefined && (
          <Text selectable style={styles.text}>
            {details.description}
          </Text>
        )}
        <Text style={styles.input}>shop location</Text>
        {details !== undefined && (
          <Text selectable style={styles.text}>
            {details.location}
          </Text>
        )}
        <Text style={styles.input}>phone number</Text>
        {details !== undefined && (
          <Text selectable style={styles.text}>
            {details.phone}
          </Text>
        )}
        <Text style={styles.input}>joined</Text>
        {details !== undefined && (
          <Text selectable style={styles.text}>
            {details.timestamp.toDate().toLocaleString("en")}
          </Text>
        )}
        <Text style={styles.input}>user/shop image</Text>
        {details !== undefined && (
          <Image
            resizeMode="contain"
            source={{ uri: details.profileImage }}
            style={{ width: 350, height: 300 }}
          />
        )}

        <TouchableOpacity>
          <Button
            style={styles.button}
            color="#ec5990"
            title="Done"
            onPress={done}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 6,
    padding: 10,
    fontWeight: "bold",
    //fontFamily: "Nunito",
  },
  likes: {
    display: "flex",
    //margin: 1,
    padding: 3,
    flex: 2,
    color: "green",
    fontWeight: "bold",
  },
  button: {
    marginTop: 4,
    color: "pink",
    height: 40,
    backgroundColor: "#ec5990",
    borderRadius: 4,
    marginBottom: 30,
  },
  input: {
    margin: 6,
    backgroundColor: "white",
    borderColor: "red",
    padding: 10,
    borderRadius: 4,
    borderBottomWidth: 4,
  },
});
