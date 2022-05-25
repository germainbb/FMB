import { View, Text, TextInput } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

export default function Edit() {
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  };

  return (
    <View>
      <Text>Contact Information</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="Type here business/shop name !"
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="Type here business description!"
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="Type here shop location!"
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="Type here phone number!"
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
      />

      <View style={styles.container}>
        <Image
          source={{ uri: "https://i.imgur.com/TkIrScD.png" }}
          style={styles.logo}
        />
        <Text style={styles.instructions}>
          To share a photo from your phone with a friend, just press the button
          below!
        </Text>

        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Text style={styles.buttonText}>Pick a photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
