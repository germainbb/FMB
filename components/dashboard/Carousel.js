import React,{useState} from "react";
import { Text, Dimensions, StyleSheet,Linking, View, TouchableOpacity, ImageBackground } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { FontAwesome } from "@expo/vector-icons";


const Carousel = () =>{
const [mobile_no, setmobile_no] = useState("0776778798")
return(
  <View style={styles.container}>
    <SwiperFlatList
      autoplay
      autoplayDelay={3}
      autoplayLoop
      index={2}
      showPagination
    >
      <View style={[styles.child, { backgroundColor: "tomato" }]}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              "http://api.whatsapp.com/send?phone=26" + mobile_no
            );
          }}
          // style={{ flex: 1, left: width * 0.18 }}
        >
          <FontAwesome name="whatsapp" size={45} color="green" />
        </TouchableOpacity>
        <Text style={styles.text}>Advertize here K50/week or k180/month</Text>
      </View>
      <View style={[styles.child, { backgroundColor: "thistle" }]}>
        <Text style={styles.text}>2</Text>
      </View>
      <View style={[styles.child, { backgroundColor: "skyblue" }]}>
        <Text style={styles.text}>3</Text>
      </View>
      <View style={[styles.child, { backgroundColor: "teal" }]}>
        <Text style={styles.text}>4</Text>
      </View>
      <ImageBackground
          //blurRadius={1}
          source={require("../../assets/money.jpg")}
          style={styles.child}
        >
          <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              "http://api.whatsapp.com/send?phone=26" + mobile_no
            );
          }}
        >
          <FontAwesome name="whatsapp" size={45} color="green" />
        </TouchableOpacity>
        </ImageBackground>
    </SwiperFlatList>
  </View>
);}

const { width, height } = Dimensions.get("window");



const styles = StyleSheet.create({
  container: { backgroundColor: "white", height: height * 0.25 },
  child: { width, justifyContent: "center" },
  text: { fontSize: width * 0.1, textAlign: "center" },
});

export default Carousel;
