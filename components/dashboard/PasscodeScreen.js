import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const PasscodeScreen = () => {
  const [text, setText] = useState("");

  const navigation = useNavigation();

  const handleSubmit = (text) => {
    if (text = "mineral") {
      navigation.navigate("add");
    } else {
      Alert.alert("Wrong Passcode");
    }
  };

  return (
    <View>
      <Text style={styles.text}>Enter Passcode</Text>
      <Text selectable style={{ padding: 10, fontSize: width * 0.05 }}>
        More than 15 posts you have to pay k25/month.{"\n"}
        After paying to 0776778798 through Airtel money, {"\n"}
        Send your name to receive the passcode.{"\n"}
        Send here
      </Text>
      <View style={{display:"flex", width: '18%'}}>
        <FontAwesome
        style={{ padding: 5, marginLeft: 8 }}
          onPress={() => {
            Linking.openURL("http://api.whatsapp.com/send?phone=260954792237");
          }}
          name="whatsapp"
          size={45}
          color="green"
        />
      </View>
      <TextInput
        autoCapitalize="none"
        placeholder="Type here the code you received!"
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
        style={{
          borderColor: "red",
          borderBottomWidth: 5,
          padding: 6,
          margin: 6,
        }}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text
          style={{
            borderColor: "green",
            borderBottomWidth: 5,
            padding: 6,
            margin: 20,
            textAlign: "center",
          }}
        >
          Let's Go
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          padding: 6,
          margin: 10,
        }}
      >
        The passcode will change after every month end.
      </Text>
      <Text
        onPress={()=>navigation.navigate("dashboard")}
        style={{
          padding: 6,
          margin: 10,
          textAlign: "center",
          color: "blue",
        }}
      >
        Go Back To Dashboard
      </Text>
    </View>
  );
};

export default PasscodeScreen;

const styles = StyleSheet.create({
  text: { fontSize: width * 0.1, textAlign: "center", color:"green" },
});
