import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";

const Arrange = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "red", true: "black" }}
        thumbColor={isEnabled ? "pink" : "green"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default Arrange;
