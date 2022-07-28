import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Payments from "./Payments"

const TopBusinessess = () => {
  return (
    <View>
      <Text
        style={{
          color: "red",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Coming soon!
      </Text>
      <Payments/>
    </View>
  );
};

export default TopBusinessess;

const styles = StyleSheet.create({});
