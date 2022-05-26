import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { updateCurrentUser } from "firebase/auth";
//import rav4 from 'fmb/assets/rav4prime.jpg';

const Stack = createNativeStackNavigator();

const Add = ({ navigation }, props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const cam = useRef().current;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      if (Platform.OS !== "web") {
        const photoStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (photoStatus.status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const uploadImg = async (image) => {
    const img = image;
    console.log("image:" + img);
    const metadata = {
      contentType: image.type,
    };
    const storageRef = ref(storage, "rav4");
    const UploadTask = await uploadBytesResumable(storageRef, img, metadata);

    UploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
        Alert.alert("Oops", "try again germain");
      },
      (err) => {
        Alert.alert(err + "not working");
      },
      () => {
        getDownloadURL(UploadTask.snapshot.ref)
          .then((url) => console.log(`url: ${url}`))
          .catch(() => {
            Alert.alert("Oops", "try again germain");
          });
      }
    );
  };

  return (
    <ScrollView style={{ flexDirection: "column", flex: 1, bottom: 90 }}>
      <View style={styles.container}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={type}
          ratio={"1:2"}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}> Capture </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={[styles.text, { color: "darkblue" }]}>
                Pick an image
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      <Button
        style={{ bottom: 600 }}
        title="save"
        onPress={() => navigation.navigate("save", { image })}
      />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ backgroundColor: "black", flex: 1 }}
        />
      )}
      <Button style={{ bottom: 600 }} title="upload" onPress={uploadImg} />
      {/*POST DETAILS*/}
      <TextInput placeholder="NAME" />
      <TextInput placeholder="PRICE" />
      <TextInput placeholder="SHORT DESCRIPTION" />
      <TextInput placeholder="PHONE NO" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    //height: 500
  },
  camera: {
    backgroundColor: "black",
    flex: 1,
    aspectRatio: 1,
    //flexDirection:'row'
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    bottom: 60,
    left: 35,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    //alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});

export default Add;
