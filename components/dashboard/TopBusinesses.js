import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Linking,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Loader from "../dashboard/Loader";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../components/dashboard/firebase";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {
  orderBy,
  collection,
  doc,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";

const { width, height } = Dimensions.get("window");

const TopBusinessess = () => {
  const [Posts, setPosts] = useState([]);
  const [show, setshow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;

  const listRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    setshow(true);
    Bringposts();
  }, []);

  const Bringposts = async () => {
    const posts = query(
      collection(db, "users"),
      orderBy("timestamp", "desc"),
      limit(40)
    );
    const querySnapshot = await getDocs(posts);

    const info = [];
    querySnapshot.docs.map((doc) => {
      //console.log(doc.id, " => ", doc.data());

      info.push({ key: doc.id, ...doc.data() });
    });
    setPosts(info);
    setRefresh(false);
    setshow(false);
  };

  const personalScreen = (props) => {
    navigation.navigate("myposts1", props);
  };

  const renderItem = ({ item }) => {
    if (item.likes.length > 0) {
      return (
        <View key={item.key} style={styles.itemContainer}>
            <TouchableOpacity
            onPress={() => personalScreen(item.email)} 
            style={{ alignSelf: "center", display: "flex", flex: 1  }}>
              {item.profileImage != null ? (
                <Loader
                  defaultImageSource={require("../../assets/download2.jpg")}
                  source={{ uri: item.profileImage }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 80,
                    marginBottom: 10,
                  }}
                  resizeMode="cover"
                />
              ) : (
                <Text>No image!</Text>
              )}
            </TouchableOpacity>
            <View style={styles.profile}>
              <Text
                selectable
                numberOfLines={2}
                style={{ marginHorizontal: 3, display: "flex", flex: 1, marginTop: 6 }}
              >
                {item.name}
              </Text>
              <Text
                selectable
                numberOfLines={2}
                style={{ marginHorizontal: 3, display: "flex", flex: 1 }}
              >
                {item.phone}
              </Text>
              <View style={{ flex: 1, display: "flex", flexDirection: "row" }}>
                <AntDesign
                  name="heart"
                  size={30}
                  color="red"
                  style={{ flex: 1, display: "flex" }}
                />
                <Text style={{ flex: 1, display: "flex" }}>
                  {item.likes.length.toLocaleString("en")} Like(s)
                </Text>
              </View>
            </View>
          
          <TouchableOpacity 
          onPress={() => {
                Linking.openURL(
                  "http://api.whatsapp.com/send?phone=26" + item.phone
                );
              }}
          style={{ display: "flex", flex: 0.5, alignSelf: "center" }}>
          
              <FontAwesome name="whatsapp" size={45} color="green" />
            
          </TouchableOpacity>
        </View>
      );
    } else {
      return;
    }
  };
  const separator = () => {
    return <View style={{ height: 1, backgroundColor: "pink" }}></View>;
  };

  return (
    <View>
      <FlatList
        ref={listRef}
        onScroll={(event) => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
        // ListHeaderComponent={<Carousel />}
        initialNumToRender={6}
        numColumns={1}
        data={Posts}
        keyExtractor={(item) => item.key.toString()}
        renderItem={renderItem}
        itemSeparatorComponent={separator}
        style={{ marginBottom: 100 }}
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
  );
};

export default TopBusinessess;

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    padding: 2,
    backgroundColor: "white",
    margin: 5,
    shadowColor: "blue",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 3,
    marginVertical: 10,
  },
  scrollTopButton: {
    position: "absolute",
    bottom: 260,
    right: 10,
  },
  profile: {
    display: "flex",
    flex: 2,
    flexDirection: "column",
  },
});
