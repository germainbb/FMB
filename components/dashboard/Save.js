import {
  StyleSheet,
  Text,
  Alert,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { db, storage } from "../../components/dashboard/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Save = (props, { navigation }) => {
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    const uri = props.route.params.image;

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const docRef = await addDoc(collection(db, "posts"), {
      profileImage: props.route.params.image,
      caption: caption,
      timestamp: serverTimestamp(),
    })
      .then(() => console.log("this is the docRef"))
      .catch(() => {
        console.log("rejected");
      });
    const imageRef = ref(storage, `images/${caption}`);
    const metadata = {
      contentType: "image/jpg",
    };

    const UploadTask = await uploadBytesResumable(
      imageRef,
      blob,
      metadata
    ).then(
      () => Alert.alert(" image uploaded successfully!!"),
      () => Alert.alert("Oops", "try again germain")
    );
    UploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => {
        Alert.alert(err + "not working");
      },
      async () => {
        Alert.alert("Oops", "try again germain");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          imageUrl: downloadURL,
        });
        blob.close();
      }
    );

    navigation.navigate("home");
  };

  return (
    <View>
      <Image
        source={{ uri: props.route.params.image }}
        style={{ width: "100%", height: 300 }}
      />
      <TextInput
        placeholder="write a description . . ."
        onChangeText={(caption) => setCaption(caption)}
      />
      <TouchableOpacity onPress={() => setCaption("")}>
        <Button title="post" onPress={() => uploadPost()} />
      </TouchableOpacity>
      <Text>uploaded {progress}</Text>
    </View>
  );
};

export default Save;

const styles = StyleSheet.create({});
