import React, {
    useState,
    useLayoutEffect,
    useEffect,
    RefreshControl,
    useRef
  } from "react";
  import {
    StyleSheet,
    FlatList,
    ScrollView,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Modal,
    Alert,
    Linking,
    BackHandler,
    ActivityIndicator,
    Pressable,
  } from "react-native";
  import { Feather } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import Carousel from "./Carousel";
  import Largeview from "./Largeview";
  //import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { MaterialIcons } from "@expo/vector-icons";
  import { FontAwesome } from "@expo/vector-icons";
  import { useSelector, useDispatch } from "react-redux";

  import { listTab } from "./Names";
  import Loader from "../dashboard/Loader";
  
  const { width, height } = Dimensions.get("window");
  
  
  const MyPosts = (props) => {
    const [name, setname] = useState("all");
    const [datalist, setDatalist] = useState();
    const [modalvisible, setModalvisible] = useState(false);
    const [mobile_no, setmobile_no] = useState("0776778798");
    const [Posts, setPosts] = useState([]);
    const [show, setshow] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [arrow, setarrow] = useState(false);
    const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
    const CONTENT_OFFSET_THRESHOLD = 300;
  
    const listRef = useRef(null);
    const userid = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const allposts = useSelector((state) => state.posts.post)
    //console.log("this is the state" + Posts)
  
    useEffect(() => {
      setshow(true);
      Bringposts();
      setstatusFilter();
    }, []);
  
    const seller = props.route.params


    const Bringposts = ()=>{
        setPosts(allposts);
        setDatalist(Posts);
        setshow(false);
      }



    // const Bringposts = async () => {
    //   const posts = query(
    //     collection(db, "users", seller, "posts"),
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
    //   setDatalist(Posts);
    //   setshow(false);
    //   //dispatch(fetchAllPosts(info))
    // };
  
    //console.log("post", Posts)
    const navigation = useNavigation();
  
    // const personalScreen = (props) => {
    //   navigation.navigate("myposts1", props);
    // };
    const largeview = (props) => {
      navigation.navigate("Largeview2", props);
    };
  
    const setstatusFilter = (name) => {
      if (name !== "all") {
        //purple and green
        setDatalist([...Posts.filter((e) => e.name === name)]);
      } else {
        setDatalist(Posts);
      }
      setname(name);
    };
  
    
  
    const renderItem = ({ item }) => {
        if (item.user === seller){
      return (
        <View key={item.key} style={styles.itemContainer}>
          <View style={styles.profile}>
            <Image
              //defaultSource={basketball}
              style={styles.profileImage}
              source={{
                uri: item.profilepic,
              }}
            />
            <Text
              numberOfLines={2}
              style={{ marginHorizontal: 3, display: "flex", flex: 1 }}
            >
              {item.businessname}
            </Text>
            <Text
              numberOfLines={2}
              style={{ marginHorizontal: 3, display: "flex", flex: 1 }}
            >
              {item.timestamp.toDate().toLocaleString("en")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => largeview(item)}
            style={styles.itemLogo}
          >
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
          </TouchableOpacity>
          <View style={styles.itemBody}>
            <Text  style={styles.itemName}>K {item.price}</Text>
            
          </View>
          <Text numberOfLines={1} style={styles.itemName}>{item.name}</Text>
          <View
            style={[
              styles.itemStatus,
              {
                backgroundColor: item.name === "purple" ? "purple" : "#69c080",
              },
            ]}
          >
          
            <Text numberOfLines={2} style={{ fontWeight: "bold"}}>{item.description}</Text>
          </View>
        </View>
      );
    }else{
        return
      }
    };
    const separator = () => {
      return <View style={{ height: 1, backgroundColor: "pink" }}></View>;
    };
  
  
    
  
    return (
      <View style={{ margin: 5 }}>
        <ScrollView horizontal>
          <View style={styles.listTab}>
            {listTab.map((e) => (
              <TouchableOpacity
                key={e.name}
                style={[styles.btnTab, name === e.name && styles.btnTabActive]}
                onPress={() => setstatusFilter(e.name)}
              >
                <Text
                  style={[
                    styles.textTab,
                    name === e.name && styles.textTabActive,
                  ]}
                >
                  {e.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
  
        <FlatList
          ref={listRef}
          onScroll={event => {
            setContentVerticalOffset(event.nativeEvent.contentOffset.y);
          }}
          ListHeaderComponent={<Carousel />}
          numColumns={2}
          data={datalist}
          keyExtractor={(item) => item.key.toString()}
          renderItem={renderItem}
          itemSeparatorComponent={separator}
          style={{ marginBottom: 110 }}
          onRefresh={() => Bringposts()}
          refreshing={refresh}
        />
        {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
          
            <Feather
              name="arrow-up-circle"
              size={60}
              color="orange"
              style={styles.scrollTopButton}
              onPress={()=>
              {listRef.current.scrollToOffset({ offset: 0,  animated: true});
              }
            }
            />
        )}
        {<ActivityIndicator size="large" color="#0000ff" animating={show} />}
      </View>
    );
  };
  
  export default MyPosts;
  
  const styles = StyleSheet.create({
    scrollTopButton: {
      position: "absolute",
      bottom: 130,
      right: 10,
    },
    listTab: {
      flexDirection: "row",
      alignSelf: "center",
      //marginBottom: 20
    },
    btnTab: {
      width: Dimensions.get("window").width / 4,
      flexDirection: "row",
      borderBottomWidth: 1,
      borderColor: "black",
      padding: 5,
      justifyContent: "center",
    },
    textTab: {
      color: "black",
      fontSize: 15,
    },
    btnTabActive: {
      borderBottomWidth: 4,
      borderColor: "#ff8c00",
    },
    textTabActive: {
      color: "#ff8c00",
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
    profileImage: {
      borderRadius: 9,
      width: 20,
      height: 20,
      margin: 3,
    },
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
      padding: 35,
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
  });
  