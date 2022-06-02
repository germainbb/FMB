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
  Dimensions,
  Pressable,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { updateCurrentUser } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

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
    <ScrollView style={{ bottom: 1 }}>
      <View style={styles.container}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={type}
          ratio={"5:5"}
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
              <MaterialIcons
                name="flip-camera-android"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: "flex",
                flex: 1,
                alignSelf: "flex-end",
                right: 10,
              }}
              onPress={takePicture}
            >
              <MaterialIcons name="camera" size={60} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <FontAwesome name="file-image-o" size={30} color="gray" />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            backgroundColor: "black",
            flex: 1,
            height: height * 0.5,
            width: width,
            marginTop: 3,
          }}
        />
      )}
      {/*POST DETAILS*/}
      <View>
        <TextInput
          placeholder="NAME"
          style={{
            borderColor: "red",
            borderBottomWidth: 5,
            padding: 6,
            margin: 6,
          }}
        />
        <TextInput
          placeholder="PRICE"
          style={{
            borderColor: "red",
            borderBottomWidth: 5,
            padding: 6,
            margin: 6,
          }}
        />
        <TextInput
          placeholder="SHORT DESCRIPTION"
          style={{
            borderColor: "red",
            borderBottomWidth: 5,
            padding: 6,
            margin: 6,
          }}
        />
        <TextInput
          placeholder="PHONE NO"
          style={{
            borderColor: "red",
            borderBottomWidth: 5,
            padding: 6,
            margin: 6,
          }}
        />
      </View>
      <View style={{ justifyContent: "center", display: "flex" }}>
        <Pressable
          onPress={() => navigation.navigate("home", { image })}
          style={{
            display: "flex",
            //width: 50,
            justifyContent: "center",

            borderRadius: 5,
          }}
        >
          <Text
            style={{
              display: "flex",
              height: height * 0.09,
              width: width * 0.6,
              backgroundColor: "skyblue",
              borderRadius: 9,
              alignSelf: "center",
              padding: 9,
              fontSize: 30,
              paddingLeft: "20%",
            }}
          >
            POST
          </Text>
        </Pressable>
      </View>
      <View style={{ marginBottom: 65 }}>
        <Text style={{ padding: 6 }}>
          .YOU CAN WRITE IN ENGLISH OR NYANJA, BUT WE RECOMMEND ENGLISH.{"\n "}
          .POST CLEAR PICTURES TO ATTRACT MORE CUSTOMERS.{"\n "}.NO IMMORAL
          PICTURES PLEASE.
          {"\n "}
          .EXPAND YOUR BUSINESS!!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textinput: {
    borderColor: "gray",
    backgroundColor: "green",
  },
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    //height: 500
  },
  camera: {
    backgroundColor: "black",
    flex: 1,
    aspectRatio: 0.9,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    bottom: 30,
    left: 35,
  },
  button: {
    display: "flex",
    flex: 1,
    alignSelf: "flex-end",
    margin: 10,
    //alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});

export default Add;
