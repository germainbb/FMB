import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "../dashboard/Carousel";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { auth, db } from "../../components/dashboard/firebase";
import { useSelector, useDispatch } from "react-redux";
import {
  orderBy,
  collection,
  doc,
  getDoc,
  collectionGroup,
  query,
  where,
  getDocs,
  arrayRemove,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";

const { width, height } = Dimensions.get("window");

const myposts = [
  {
    profileImage: "",
    caption: "",
    username: "is",
    name: "k1000",
    status: "purple",
  },
  {
    profileImage: "",
    caption: "",
    username: "billionaire",
    name: "k200",
    status: "all",
  },
  {
    profileImage: "",
    caption: "",
    username: "germain",
    name: "k500",
    status: "green",
  },
  {
    profileImage: "",
    caption: "",
    username: "is",
    name: "k100",
    status: "purple",
  },
  {
    profileImage: "",
    caption: "",
    username: "billionaire",
    name: "k200",
    status: "all",
  },
  {
    profileImage: "",
    caption: "",
    username: "germain",
    name: "k500",
    status: "green",
  },
  {
    profileImage: "",
    caption: "",
    username: "germain",
    name: "k500",
    status: "green",
  },
];

export default function Dashboard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [Posts, setPosts] = useState([]);
  const [show, setshow] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const userid = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    setshow(true);
    Bringposts();
  }, []);
  const Bringposts = async () => {
    const posts = query(
      collection(db, "users", userid, "posts"),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(posts);
    setRefresh(false);
    
    const info = [];
    querySnapshot.docs.map((doc) => {
      //console.log(doc.id, " => ", doc.data());

      info.push({ key: doc.id, ...doc.data() });
    });
    setPosts(info);
    //console.log(Posts);
    setshow(false);
    //dispatch(fetchAllPosts(info))
  };


  const onSubmit = (props) => {
    navigation.navigate("Delete", props)
  };

  const navigation = useNavigation();
  const addScreen = () => {
    navigation.navigate("add");
  };
  const editScreen = () => {
    navigation.navigate("edit");
  };
  const details = ()=>{
    navigation.navigate("contact")
  }

  const RenderItem = ({ item }) => {
    return (
      <View key={item.key} style={styles.itemContainer}>
        <TouchableOpacity onPress={()=>onSubmit(item)}>
        <Text
            numberOfLines={2}
            style={{ marginHorizontal: 3, display: "flex", flex: 1 }}
          >
            {item.timestamp.toDate().toLocaleString("en")}
          </Text>
          <View style={styles.itemLogo}>
            <Image
              resizeMode="contain"
              style={styles.itemImage}
              source={{
                uri: item.profileImage
              }}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.itemBody}>
          <Text style={styles.itemName}>{item.name}</Text>
          
        </View>
        <View
          style={[
            styles.itemStatus,
            {
              backgroundColor: item.status === "purple" ? "purple" : "#69c080",
            },
          ]}
        >
          <Text>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      {/* //NAME AND TWO ICONS */}
      <View style={styles.header}>
      <TouchableOpacity 
          onPress={details} 
          style={{
            flexDirection: "row",
            flex: 6,
            display: "flex",
            justifyContent: "flex-start",
            alignSelf: "center",
          }}>
        <Text
          style={{
            left: 3,
            flex: 2,
            display: "flex",
            justifyContent: "flex-start",
            alignSelf: "center",
          }}
        >
          NAME OF BUSINESS
        </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={editScreen}
          style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
        >
          <SimpleLineIcons name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={addScreen}
          style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
        >
          <Ionicons name="add-sharp" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View>
      <FlatList
        ListHeaderComponent={<Carousel />}
        numColumns={2}
        data={Posts}
        keyExtractor={(item) => item.key.toString()}
        renderItem={RenderItem}
        //itemSeparatorComponent={separator}
        style={{ marginBottom: 220 }}
        onRefresh={() => Bringposts()}
        refreshing={refresh}
      />
      {<ActivityIndicator size="large" color="#0000ff" animating={show} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    //justifyContent: "center",
    flexDirection: "row",
    height: height * 0.08,
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  itemContainer: {
    display: "flex",
    flex: 0.5,
    //padding: 2,
    width: "50%",
    marginHorizontal: 3,
    backgroundColor: "white",
    marginBottom: 5,
  },
  itemLogo: {
    padding: 5,
    display: "flex",
  },
  itemImage: {
    position: "relative",
    flex: 1,
    display: "flex",
    //width: width,
    height: height * 0.25,
  },
  itemBody: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "flex-end",
  },
  itemStatus: {
    backgroundColor: "green",
    justifyContent: "center",
    padding: 3,
  },
  image: {
    width: width * 0.6,
    height: height * 0.45,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flex: 1,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
  
});
