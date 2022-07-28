import {
  View,
  Text,
  TextInput,
  Dimensions,
  Button,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
// import React from "react";
// import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { updateDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import {useSelector, useDispatch} from "react-redux";
import { db, storage } from "./firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDownloadURL, ref, uploadBytes  } from "firebase/storage";

const { width, height } = Dimensions.get("window");

export default function Edit(props) {
  const [image, setImage] = useState(null);
  const [url, seturl] = useState(null);
  const [show, setshow] = useState(null);

  //const count = useSelector((state) => state.counter.value)
  const userid = useSelector((state) => state.user.currentUser)

  const navigation = useNavigation();

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== "web") {
  //       const { status } =
  //         await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== "granted") {
  //         alert("Sorry, we need camera roll permissions to make this work!");
  //       }
  //     }
  //   })();
  // }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      businessName: "",
      businessDescription: "",
      shopLocation: "",
      phoneNumber: "",
    },
  });
  const onSubmit = async(props) => {
    console.log(userid);
    console.log( props);

    setshow(true)
    //upload image to storage and get download url
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
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const imageRef = ref(storage, `${userid}/${props.name}`);
    

    await uploadBytes (
      imageRef,
      blob,
    ).then(async()=>{
      const downloadURL = await getDownloadURL(imageRef);
      
      //upload post
      await updateDoc(doc(db, "users",userid), {
        profileImage: downloadURL,
        description: props.businessDescription,
        timestamp: serverTimestamp(),
        name: props.businessName,
        phone: props.phoneNumber,
        location: props.shopLocation,
      })
        .then(async() => {
          setshow(false)
          navigation.navigate("contact"); 
          Alert.alert(" details updated successfully!!");
            try {
              await AsyncStorage.setItem("name", props.businessName);
              await AsyncStorage.setItem("image", downloadURL);
              //console.log(email + password);
            } catch (e) {
              // saving error
              console.log(e);
            }
        })
        .catch(() => {
          () => Alert.alert("Oops", "try again buddy");
        });

      blob.close()
    }).catch(
      () => Alert.alert(" image not uploaded !!")
    )

    
    
    
  };

  // console.log("errors", errors);

  return (
    <ScrollView style={{ flex: 1, bottom: 60, height: height * 20 }}>
      <View style={styles.container}>
        <Text style={styles.label}>Business name</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
            autoCapitalize="none"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="businessName"
          rules={{ required: true }}
        />
        {errors.businessName && (
          <Text style={{ color: "red" }}>This is required.</Text>
        )}
        <Text style={styles.label}>Business Description</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
            autoCapitalize="none"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="businessDescription"
          rules={{ required: true }}
        />
        {errors.businessDescription && (
          <Text style={{ color: "red" }}>This is required.</Text>
        )}
        <Text style={styles.label}>Shop Location</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
            autoCapitalize="none"
              placeholder="Libala,Lusaka, or google maps location code"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="shopLocation"
          rules={{ required: true }}
        />
        {errors.shopLocation && (
          <Text style={{ color: "red" }}>This is required.</Text>
        )}
        <Text style={styles.label}>Phone Number</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="0989898989 (whatsApp)"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              keyboardType={"numeric"}
            />
          )}
          name="phoneNumber"
          rules={{ required: true }}
        />
        {errors.phoneNumber && (
          <Text style={{ color: "red" }}>This is required.</Text>
        )}

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: -40,
          }}
        >
          <Button title="Pick an image of your shop" onPress={pickImage} />
          {image && (
            <Image
              resizeMode="contain"
              source={{ uri: image }}
              style={{ width: 350, height: 300 }}
            />
          )}
        </View>
        <View style={styles.button}>
          <Button
            style={styles.buttonInner}
            color="#ec5990"
            title="Submit"
            onPress={handleSubmit((data)=>onSubmit(data))}
          />
        </View>
        {<ActivityIndicator size="large" color="#0000ff" animating={show} /> }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "black",
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 4,
    color: "pink",
    height: 40,
    backgroundColor: "#ec5990",
    borderRadius: 4,
    marginBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    padding: 8,
    paddingTop: 58,
    //backgroundColor: "#0e101c",
    height: height * 1.3,
  },
  input: {
    backgroundColor: "white",
    borderColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
