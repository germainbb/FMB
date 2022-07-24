import { StyleSheet, Linking,Dimensions, Text, View,TouchableOpacity, ScrollView,Image } from 'react-native'
import React,{useState} from 'react'
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";



const { width, height } = Dimensions.get("window");

const Largeview = (props) => {
    //console.log("these are props",props);
    const [phone , setphone] = useState('0776778798')
    const navigation = useNavigation();

    const item = props.route.params
    
    const onSubmit = (props) => {
        navigation.navigate("contact1", props);
        
      };
  return (
    <ScrollView >
          <View style={styles.centeredView}>
            <View  style={styles.modalView}>
              <TouchableOpacity
                style={{
                  display: "flex",
                  bottom: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                onPress={() => navigation.goBack('home')}
              >
                <Text style={{ display: "flex", flex: 1 }}>
                {item.timestamp.toDate().toLocaleString("en")}
                </Text>
                <FontAwesome name="times" size={30} color="black" />
              </TouchableOpacity>
              <View style={styles.profilepic}>
                <Image
                  style={styles.profileimage}
                  source={{
                    uri: item.profilepic 
                  }}
                />
                <Text style={{ alignSelf: "center" }}>{item.businessname}</Text>
              </View>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{
                  uri:  item.profileImage
                }}
              />
              <View style={styles.itembody}>
                <Text style={styles.itemPrice}>K {item.price} </Text>
              </View>
              <Text style={styles.modalText}>{item.description}</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.description}
              </Text>
              <View style={styles.contact}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={()=>onSubmit(item.user)}
                >
                  <Text style={styles.textStyle}>seller details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      "http://api.whatsapp.com/send?phone=26" + item.phone
                    );
                  }}
                  style={{ flex: 1, left: width * 0.18 }}
                >
                  <FontAwesome name="whatsapp" size={45} color="green" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
  )
}

export default Largeview

const styles = StyleSheet.create({
    profileimage: {
        borderRadius: 9,
        width: 60,
        height: 60,
        margin: 3,
      },
      profile: {
        display: "flex",
    
        flexDirection: "row",
      },
      profilepic: {
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      },
      centeredView: {
        flex: 1,
        //backgroundColor: "black",
        alignItems: "center",
        marginTop: "70%",
        width: "80%",
        left: "10%",
        bottom: "15%",
      },
      modalView: {
        display: "flex",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "darkorange",
        shadowOffset: {
          width: 0,
          height: 50,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      image: {
        //paddingHorizontal: 0,
        display: "flex",
        flex: 2,
        width: width * 0.8,
        height: height * 0.5,
      },
      itembody: {
        justifyContent: "space-between",
        flexDirection: "row",
      },
      itemPrice: {
        fontWeight: "bold",
        right: width * 0.19,
      },
      contact: {
        flexDirection: "row",
        display: "flex",
        top: 6,
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        flex: 1,
      },
})