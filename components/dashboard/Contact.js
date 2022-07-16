import {
  View,
  Button,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity, Dimensions
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import rav from "../../assets/rav4prime.jpg";
import { Feather } from "@expo/vector-icons";


const { width, height } = Dimensions.get("window");

export default function Contact() {
  const navigation = useNavigation();

  const done = () => {
    navigation.goBack("home");
  };
  return (
    <ScrollView>
      <View style={{ marginBottom: 75 }}>
        <Text
          style={{ fontSize: 30, padding: 6, color: "green", fontFamily: "" }}
        >
          contact details
        </Text>
        <TouchableOpacity style={{ left: 20, flexDirection:"row", display: "flex"}}>
          <Feather name="heart" size={30} color="skyblue" style={{flex: 1, display: "flex"}}/>
          <Text style={styles.likes}>10       people like your business </Text>
        </TouchableOpacity>
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
            title="Dne"
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
  likes: {
    display: "flex",
    //margin: 1,
    padding: 3,
   flex: 2
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
