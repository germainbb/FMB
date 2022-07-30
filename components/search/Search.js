import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Loader from "../dashboard/Loader";

const { width, height } = Dimensions.get("window");

const SearchBar = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const [datalist, setDatalist] = useState();
  const CONTENT_OFFSET_THRESHOLD = 300;

  const allposts = useSelector((state) => state.posts.post);

  useEffect(() => {
    Bringposts();
  }, []);

  const Bringposts = () => {
    setDatalist(allposts);
  };
  const listRef = useRef(null);
  const navigation = useNavigation();

  const personalScreen = (props) => {
    navigation.navigate("my store", props);
  };
  const largeview = (props) => {
    navigation.navigate("Largeview5", props);
  };

  const separator = () => {
    return <View style={{ height: 1, backgroundColor: "pink" }}></View>;
  };

  // rendering the item
  const renderItem = ({ item }) => {
    if (searchPhrase === "") {
      return (
        <View key={item.key} style={styles.itemContainer}>
          <View style={styles.profile}>
            <Image
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
            <Text style={styles.itemName}>K {item.price}</Text>
            <TouchableOpacity onPress={() => personalScreen(item.user)}>
              <MaterialIcons name="store" size={24} color="green" />

              <Text>stock</Text>
            </TouchableOpacity>
          </View>
          <Text numberOfLines={1} style={styles.itemName}>
            {item.name}
          </Text>
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
    }

    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <View key={item.key} style={styles.itemContainer}>
          <View style={styles.profile}>
            <Image
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
            <Text style={styles.itemName}>K{item.price}</Text>
            <TouchableOpacity onPress={() => personalScreen(item.user)}>
              <MaterialIcons name="store" size={24} color="green" />

              <Text>stock</Text>
            </TouchableOpacity>
          </View>
          <Text numberOfLines={1} style={styles.itemName}>
            {item.name}
          </Text>
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
    }

    // filter of the businessname
    if (
      item.businessname
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <View key={item.key} style={styles.itemContainer}>
          <View style={styles.profile}>
            <Image
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
            <Text style={styles.itemName}>K{item.price}</Text>
            <TouchableOpacity onPress={() => personalScreen(item.user)}>
              <MaterialIcons name="store" size={24} color="green" />

              <Text>stock</Text>
            </TouchableOpacity>
          </View>
          <Text numberOfLines={1} style={styles.itemName}>
            {item.name}
          </Text>
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
    }
    //filter of the description
    if (
      item.description
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <View key={item.key} style={styles.itemContainer}>
          <View style={styles.profile}>
            <Image
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
            <Text style={styles.itemName}>K {item.price}</Text>
            <TouchableOpacity onPress={() => personalScreen(item.user)}>
              <MaterialIcons name="store" size={24} color="green" />

              <Text>stock</Text>
            </TouchableOpacity>
          </View>
          <Text numberOfLines={1} style={styles.itemName}>
            {item.name}
          </Text>
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
    }
    if (
      item.price
        .replace(/\s|,/g, "")
        .includes(searchPhrase.trim().replace(/\s|,/g, ""))
    ) {
      return (
        <View key={item.key} style={styles.itemContainer}>
          <View style={styles.profile}>
            <Image
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
            <Text style={styles.itemName}>K {item.price}</Text>
            <TouchableOpacity onPress={() => personalScreen(item.user)}>
              <MaterialIcons name="store" size={24} color="green" />

              <Text>stock</Text>
            </TouchableOpacity>
          </View>
          <Text numberOfLines={1} style={styles.itemName}>
            {item.name}
          </Text>
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
    }
  };
  // rendering the item

  return (
    <View
      onStartShouldSetResponder={() => {
        setClicked(false);
      }}
    >
      <View style={styles.container}>
        <View
          style={
            clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
          }
        >
          {/* search Icon */}
          <Feather
            name="search"
            size={20}
            color="black"
            style={{ marginLeft: 1 }}
          />
          {/* Input field */}
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            onFocus={() => {
              setClicked(true);
            }}
          />
          {/* cross Icon, depending on whether the search bar is clicked or not */}
          {clicked && (
            <Entypo
              name="cross"
              size={25}
              color="black"
              style={{ padding: 1 }}
              onPress={() => {
                setSearchPhrase("");
              }}
            />
          )}
        </View>
        {/* cancel button, depending on whether the search bar is clicked or not */}
        {clicked && (
          <View>
            <Button
              title="Cancel"
              onPress={() => {
                Keyboard.dismiss();
                setClicked(false);
              }}
            ></Button>
          </View>
        )}
      </View>
      <FlatList
        ref={listRef}
        onScroll={(event) => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
        numColumns={2}
        data={datalist}
        keyExtractor={(item) => item.key.toString()}
        renderItem={renderItem}
        itemSeparatorComponent={separator}
        style={{ marginBottom: 150 }}
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
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  //FROM SHOPS
  scrollTopButton: {
    position: "absolute",
    bottom: 170,
    right: 10,
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
