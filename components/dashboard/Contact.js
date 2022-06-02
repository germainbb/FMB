import {
  View,
  Button,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import rav from "../../assets/rav4prime.jpg";

// const { width, height } = Dimensions.get("window");

export default function Contact() {
  const navigation = useNavigation();

  const done = () => {
    navigation.navigate("home");
  };
  return (
    <ScrollView>
      <View style={{ marginBottom: 75 }}>
        <Text
          style={{ fontSize: 30, padding: 6, color: "green", fontFamily: "" }}
        >
          contact details
        </Text>
        <Text style={styles.input}>business name</Text>
        <Text selectable style={styles.text}>
          bhkjhnkdskjndjskhckjdsbhcjdscbhjdcbjbcjdbcjdbcjxbcjsdgbcjdshcfjdsgjsdjdcjzzjcjdchdj
        </Text>
        <Text style={styles.input}>business description</Text>
        <Text selectable style={styles.text}>
          bhkjhnkdskjndjskhckjdsbhcjdscbhjdcbjbcjdbcjdbcjxbcjsdgbcjdshcfjdsgjsdjdcjzzjcjdchdj
        </Text>
        <Text style={styles.input}>shop location</Text>
        <Text selectable style={styles.text}>
          bhkjhnkdskjndjskhckjdsbhcjdscbhjdcbjbcjdbcjdbcjxbcjsdgbcjdshcfjdsgjsdjdcjzzjcjdchdj
        </Text>
        <Text style={styles.input}>phone number</Text>
        <Text selectable style={styles.text}>
          bhkjhnkdskjndjskhckjdsbhcjdscbhjdcbjbcjdbcjdbcjxbcjsdgbcjdshcfjdsgjsdjdcjzzjcjdchdj
        </Text>
        <Text style={styles.input}>shop image</Text>
        <Image
          resizeMode="contain"
          source={rav}
          style={{ width: 350, height: 300 }}
        />
        <TouchableOpacity>
          <Button
            style={styles.button}
            color="#ec5990"
            title="Done"
            onPress={done}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 6,
    padding: 10,
    //fontFamily: "Nunito",
  },
  button: {
    marginTop: 4,
    color: "pink",
    height: 40,
    backgroundColor: "#ec5990",
    borderRadius: 4,
    marginBottom: 30,
  },
  input: {
    margin: 6,
    backgroundColor: "white",
    borderColor: "red",
    padding: 10,
    borderRadius: 4,
    borderBottomWidth: 4,
  },
});
