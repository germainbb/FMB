import { StyleSheet, Text, View, Linking } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Feedback = () => {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 30, padding: 6, color: "green" }}>Feedback</Text>
      <MaterialCommunityIcons
        onPress={() =>
          Linking.openURL("http://api.whatsapp.com/send?phone=260954792237")
        }
        name="whatsapp"
        size={60}
        color="green"
      />
      <MaterialCommunityIcons
        onPress={() => Linking.openURL("mailto:gemcode3@outlook.com")}
        name="microsoft-outlook"
        size={60}
        color="deepskyblue"
      />
    </View>
  );
};

export default Feedback;
