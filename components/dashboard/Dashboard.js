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
import React, { useState, useEffect, useRef } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "../dashboard/Carousel";
import Loader from "../dashboard/Loader";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { auth, db } from "../../components/dashboard/firebase";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Dashboard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [Posts, setPosts] = useState([]);
  const [show, setshow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [arrow, setarrow] = useState(false);
  const [bname, setbname] = useState();
  const [pic, setpic] = useState();
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;

  const listRef = useRef(null);
  const userid = useSelector((state) => state.user.currentUser);
  const allposts = useSelector((state) => state.posts.post);

  useEffect(() => {
    setshow(true);
    Bringposts();
  }, []);

  const Bringposts = async () => {
    setPosts(allposts);
    const businessName = await AsyncStorage.getItem("name");
    const profilepic = await AsyncStorage.getItem("image");
    setbname(businessName);
    setpic(profilepic);
    setshow(false);
  };

  // const Bringposts = async () => {
  //   const posts = query(
  //     collection(db, "users", userid, "posts"),
  //     orderBy("timestamp", "desc")
  //   );
  //   const querySnapshot = await getDocs(posts);
  //   setRefresh(false);

  //   const info = [];
  //   querySnapshot.docs.map((doc) => {
  //     //console.log(doc.id, " => ", doc.data());

  //     info.push({ key: doc.id, ...doc.data() });
  //   });
  //   setPosts(info);
  //   //console.log(Posts);
  //   setshow(false);
  //   //dispatch(fetchAllPosts(info))
  //   const businessName = await AsyncStorage.getItem("name");
  //   const profilepic = await AsyncStorage.getItem("image");
  //   setbname(businessName)
  //   setpic(profilepic)
  // };

  const onSubmit = (props) => {
    navigation.navigate("Delete", props);
  };

  const navigation = useNavigation();
  const addScreen = () => {
    navigation.navigate("add");
  };
  const editScreen = () => {
    navigation.navigate("edit");
  };
  const details = () => {
    navigation.navigate("contact");
  };

  const RenderItem = ({ item }) => {
    if (item.user === userid) {
      return (
        <View key={item.key} style={styles.itemContainer}>
          <TouchableOpacity onPress={() => onSubmit(item)}>
            <Text
              numberOfLines={2}
              style={{ marginHorizontal: 3, display: "flex", flex: 1 }}
            >
              {item.timestamp.toDate().toLocaleString("en")}
            </Text>
            <View style={styles.itemLogo}>
              {/* <Image
              resizeMode="contain"
              style={styles.itemImage}
              source={{
                uri: item.profileImage
              }}
            /> */}
              {item.profileImage != null ? (
                <Loader
                  defaultImageSource={require("../../assets/download2.jpg")}
                  source={{ uri: item.profileImage }}
                  style={styles.itemImage}
                  resizeMode="contain"
                />
              ) : (
                <Text>No image!</Text>
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.itemBody}>
            <Text style={styles.itemName}>K {item.price}</Text>
            <Text numberOfLines={2} style={styles.itemName}>
              {item.name}
            </Text>
          </View>
          <View
            style={[
              styles.itemStatus,
              {
                backgroundColor:
                  item.status === "purple" ? "purple" : "#69c080",
              },
            ]}
          >
            <Text numberOfLines={2} style={{ fontWeight: "bold" }}>
              {item.description}
            </Text>
          </View>
        </View>
      );
    } else {
      return;
    }
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
          }}
        >
          <Image
            style={styles.profileImage}
            source={{
              uri: pic,
            }}
          />
          <Text
            style={{
              left: 3,
              flex: 2,
              display: "flex",
              justifyContent: "flex-start",
              alignSelf: "center",
            }}
          >
            {bname}
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
          ref={listRef}
          onScroll={(event) => {
            setContentVerticalOffset(event.nativeEvent.contentOffset.y);
          }}
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
        {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
          <Feather
            name="arrow-up-circle"
            size={60}
            color="orange"
            style={styles.scrollTopButton}
            onPress={() => {
              listRef.current.scrollToOffset({ offset: 0, animated: true });
            }}
          />
        )}
        {<ActivityIndicator size="large" color="#0000ff" animating={show} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 9,
    width: 40,
    height: 40,
    margin: 3,
  },
  scrollTopButton: {
    position: "absolute",
    bottom: 260,
    right: 10,
  },
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
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    //paddingHorizontal: 10,
    alignItems: "center",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
    //alignItems: "flex-end",
    flex: 1,
    paddingHorizontal: 2,
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
