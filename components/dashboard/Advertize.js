import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";


const { width, height } = Dimensions.get("window");

const Advertize = () => {
  return (
    <ScrollView>
      <Text style={styles.text}>How To Advertize</Text>
      <Text style={{ padding: 10, fontSize: width * 0.07, color: "green" }}>
        With Carousels
      </Text>
      <Text style={{ padding: 10, fontSize: width * 0.05 }}>
        1. Tap the whatsapp icon on the carousel which says to advertize.{"\n"}
        2. Send; your business name on FMB, airtel money name, photo to be
        diplayed on the carousel(preferably small in size[1mb]){"\n"}, whatsApp
        active number, and a few words to catch prospects.{"\n"}
        3. Then send airtel payments to 0776778798.{'\n'}
         4.There are 30 carousels at
        a time.
      </Text>
      <Text style={{ padding: 10, fontSize: width * 0.07, color: "green" }}>
        With notifications
      </Text>
      <Text style={{ padding: 10, fontSize: width * 0.05 }}>
        You can choose to advertize your business through notifications.{"\n"}
        1. Tap the whatsapp icon below.{"\n"}
        2. Send; your business name on FMB, airtel money name, photo to be
        diplayed on the notification(preferably small in size[1mb]){"\n"},
        whatsApp active number, and a few words to catch prospects.{"\n"}
        3. N.B: There can only be 20 notifications or less per day.{'\n'}
         4. Then send
        airtel payments to 0776778798
      </Text>
      <TouchableOpacity
          style={{padding:60}}
          onPress={() => {
            Linking.openURL(
              "http://api.whatsapp.com/send?phone=260954792237"
            );
          }}
        >
          <FontAwesome name="whatsapp" size={45} color="green" />
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: width * 0.1, textAlign: "center", color: "green" },
});

export default Advertize;
