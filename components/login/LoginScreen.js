import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { auth } from "../dashboard/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../dashboard/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from 'react-redux'
import { setuser } from "../../reduxTK/reducers/User";

const provider = new GoogleAuthProvider();

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setshow] = useState(false)
  
  const dispatch = useDispatch()
  const navigation = useNavigation();

  useEffect(() => {
    
  }, []);

  const handleCreateAccount =() => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        console.log("account created");
        const user = userCredential.user;
        setshow(true)
        dispatch(setuser(user.email))
        console.log(user.email);
        await setDoc(doc(db, "users",user.email), {
          email: email,
        })
          .then(() => console.log("this is the email"))
          .catch(() => {
            console.log("rejected");
          });
        storeData(email, password);
        navigation.navigate("FMB");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const handleSignIn = async () => {
    const emaill = await AsyncStorage.getItem("Email");
    const pass = await AsyncStorage.getItem("Password");
    signInWithEmailAndPassword(auth, emaill, pass)
      .then(async (userCredential) => {
        setshow(true)
        console.log("signed in");
        const user = userCredential.user;
        dispatch(setuser(user.email))
        console.log(user.email);
        await addDoc(collection(db, "users"), {
          email: email,
        })
          .then(() => console.log("this is the email"))
          .catch(() => {
            console.log("rejected");
          });

        navigation.navigate("FMB");
      })
      .catch((error) => {
        Alert.alert("register please");
        console.log(error);
      });
  };

  //SAVE THE EMAIL AND PASSWORD IN ASYNCSTORAGE

  const storeData = async (email, password) => {
    try {
      await AsyncStorage.setItem("Email", email);
      await AsyncStorage.setItem("Password", password);
      //console.log(email + password);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Text>Tap login if you've registered before{"\n"}Tap register to register for the first time</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <Text></Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleCreateAccount}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {<ActivityIndicator size="large" color="#0000ff" animating={show}/>}
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    top: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "orange",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "black",
    borderWidth: 2,
  },
  buttonOutlineText: {},
});
