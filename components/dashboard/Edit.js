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
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
// import React from "react";
// import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function Edit() {
  const [image, setImage] = useState(null);

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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      businessName: "",
      businessDescription: "",
      shopLocation: "",
      phoneNumber: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate("contact");
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
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
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
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
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
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
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
              onChangeText={onChange}
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
            onPress={handleSubmit(onSubmit)}
          />
        </View>
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
