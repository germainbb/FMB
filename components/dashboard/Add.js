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
import { db, storage } from "../../components/dashboard/firebase";
import { updateCurrentUser } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useForm, Controller } from "react-hook-form";
import { LogBox } from 'react-native';
import {useSelector, useDispatch} from "react-redux";

LogBox.ignoreLogs(['Setting a timer']);


const { width, height } = Dimensions.get("window");

const Stack = createNativeStackNavigator();

const Add = ({ navigation }, props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
   const [category, setcategory] = useState("");
  // const [name, setname] = useState("");
  // const [description, setdescription] = useState("");
  // const [price, setprice] = useState(0);
  // const [phone, setphone] = useState("");
  const [profilepic, setprofilepic] = useState(null);
  const [loading, setLoading] = useState(false);

  const userid = useSelector((state) => state.user.currentUser)


  //const navigationo = useNavigation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      phone: "",
      category: "",
    },
  });

  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

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

  // const uploadImg = async (image) => {
  //   const img = image;
  //   console.log("image:" + img);
  //   const metadata = {
  //     contentType: image.type,
  //   };
  //   const storageRef = ref(storage, "rav4");
  //   const UploadTask = await uploadBytesResumable(storageRef, img, metadata);

  //   UploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const prog = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setProgress(prog);
  //       Alert.alert("Oops", "try again germain");
  //     },
  //     (err) => {
  //       Alert.alert(err + "not working");
  //     },
  //     () => {
  //       getDownloadURL(UploadTask.snapshot.ref)
  //         .then((url) => console.log(`url: ${url}`))
  //         .catch(() => {
  //           Alert.alert("Oops", "try again germain");
  //         });
  //     }
  //   );
  // };

  // UPLOADING POST TO FIREBASE FIRESTORE
  
  const uploadPost = async (props) => {
    console.log(props.name);
    if (loading) return;

    setLoading(true);

    const uri = image;

    const blob = await new Promise((resolve, reject) => {
      const uri = image;
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

    const docRef = await addDoc(collection(db, "users", userid, "posts"), {
      profileImage: image,
      description: props.description,
      timestamp: serverTimestamp(),
      price: props.price,
      name: props.name,
      phone: props.phone,
      category: props.category,
      // profilepic: profilepic,
      // likes: likes,
      // likesByUsers: likesByUsers
    })
      .then(() => Alert.alert(" post uploaded successfully!!"))
      .catch(() => {
        () => Alert.alert("Oops", "try again buddy");
      });

      navigation.goBack("dashboard")
    // const imageRef = ref(storage, `images/${description}`);
    // const metadata = {
    //   contentType: "image/jpg",
    // };

    // const UploadTask = await uploadBytesResumable(
    //   imageRef,
    //   blob,
    //   metadata
    // ).then(
    //   () => Alert.alert(" image uploaded successfully!!"),
    //   () => Alert.alert("Oops", "try again germain")
    // )
    // UploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const prog = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //     setProgress(prog);
    //   },
    //   (err) => {
    //     Alert.alert(err + "not working");
    //   },
    //   async () => {
    //     Alert.alert("Oops", "try again germain");
    //     const downloadURL = await getDownloadURL(imageRef);
    //     await updateDoc(doc(db, "posts", docRef.id), {
    //       imageUrl: downloadURL,
    //     });
    //     blob.close();
    //     navigation.goBack("dashboard");
    //   }
    // );
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
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="example(SHOES or DRESS)"
              value={value}            
              onBlur={onBlur}            
              onChangeText={value => onChange(value)}
              style={{
                borderColor: "red",
                borderBottomWidth: 5,
                padding: 6,
                margin: 6,
              }}
            />
          )}
          name="name"
          rules={{ required: true }}
        />
        {errors.name && (
          <Text style={{ color: "red" }}>This is required.</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              keyboardType="number-pad"
              placeholder="PRICE IN KWACHA"
              value={value}            
              onBlur={onBlur}            
              onChangeText={value => onChange(value)}
              style={{
                borderColor: "red",
                borderBottomWidth: 5,
                padding: 6,
                margin: 6,
              }}
            />
          )}
          name="price"
          rules={{ required: true }}
        />
        {errors.price && (
          <Text style={{ color: "red" }}>This is required.</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="SHORT DESCRIPTION (eg: JORDANS 1,...)"
              value={value}            
              onBlur={onBlur}            
              onChangeText={value => onChange(value)}
              style={{
                borderColor: "red",
                borderBottomWidth: 5,
                padding: 6,
                margin: 6,
              }}
            />
          )}
          name="description"
          rules={{ required: true }}
        />
        {errors.description && (
          <Text style={{ color: "red" }}>This is required.</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              keyboardType="number-pad"
              value={value}            
              onBlur={onBlur}            
              onChangeText={value => onChange(value)}
              placeholder="PHONE NO"
              style={{
                borderColor: "red",
                borderBottomWidth: 5,
                padding: 6,
                margin: 6,
              }}
            />
          )}
          name="phone"
          rules={{ required: true }}
        />
        {errors.phone && (
          <Text style={{ color: "red" }}>This is required.</Text>
        )}
      <Controller
        control={control}
        render={({value})=> (
        <View
          style={{
            borderColor: "red",
            borderBottomWidth: 5,
            padding: 6,
            margin: 6,
          }}
        >
        
          <Picker
            selectedValue={value}
            onValueChange={(itemValue, itemIndex) => setValue("category",itemValue)}
            mode="dropdown"
            prompt="select category"
          >
            <Picker.Item label="select category" value="meetups" />
            <Picker.Item label="meetup" value="meetups" />
            <Picker.Item label="Shop" value="shops" />
            <Picker.Item label="worker" value="worker" />
          </Picker>
        </View>
        )}
        name="category"
        rules={{ required: true }}
      />
      {errors.phone && (
          <Text style={{ color: "red" }}>This is required.</Text>
        )}

      </View>
      <View style={{ justifyContent: "center", display: "flex" }}>
        <TouchableOpacity onPress={handleSubmit((data)=> uploadPost(data))} style={styles.postbutton}>
        <Text style={{alignSelf: "center", marginTop: 6, fontSize: 25}}>
          POST
        </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 65 }}>
        <Text style={{ padding: 6 }}>
         
          .POST CLEAR PICTURES TO ATTRACT MORE CUSTOMERS.{"\n "}
          .EXPAND YOUR BUSINESS 😊❤🚀🌎!!
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
  postbutton: {
    marginTop: 4,
    color: "pink",
    height: 40,
    backgroundColor: "#ec5990",
    borderRadius: 4,
    marginBottom: 40,
    
  },
});

export default Add;
