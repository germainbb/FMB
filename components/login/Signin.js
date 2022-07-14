import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../dashboard/firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../dashboard/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { setuser } from "../../reduxTK/reducers/User";

const Signin = () => {
  const navigation = useNavigation();
  const [animate, setanimate] = useState(true);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setTimeout(() => {navigation.navigate("FMB sign up")}, 6000)
    const handleSignIn = async () => {
      const emaill = await AsyncStorage.getItem("Email");
      const pass = await AsyncStorage.getItem("Password");
      if (emaill !== null && pass !== null) {
        signInWithEmailAndPassword(auth, emaill, pass)
          .then(async (userCredential) => {
            //console.log("signed in");
            const user = userCredential.user;
            dispatch(setuser(user.email));
            console.log(user.email);
            navigation.navigate("FMB");
            // await addDoc(collection(db, "users"), {
            //   email: emaill,
            // })
            //   .then(() => console.log("this is the email"))
            //   .catch(() => {
            //     console.log("rejected");
            //   });
          })
          .catch((error) => {
            navigation.navigate("FMB sign up");
            console.log(error);
          });
      } else {
        console.log("no data");
      }
    };
    handleSignIn();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="green" animating={true} />
      <Text style={{ alignSelf: "center" }}>Please wait</Text>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
