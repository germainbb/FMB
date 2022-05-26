import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Dashboard() {
  const renderItem = () => {
    return (
      <View>
        <View style={styles.itemLogo}>
          <Image
            style={styles.itemImage}
            source={{
              uri: "https://dks.scene7.com/is/image/GolfGalaxy/18NIKMNBLKRSLBRNYLAL?qlt=70&wid=600&fmt=pjpeg",
            }}
          />
        </View>
        <View style={styles.itemBody}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity>
            <FavoriteBorderIcon />
            <Text>10m</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.itemStatus,
            {
              backgroundColor: item.status === "purple" ? "purple" : "#69c080",
            },
          ]}
        >
          <Text>{item.status}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      //NAME AND TWO ICONS
      <View>
        <Text>Dashboard</Text>
        <TouchableOpacity>
          <EditOutlinedIcon />
        </TouchableOpacity>
        <TouchableOpacity>
          <AddOutlinedIcon />
        </TouchableOpacity>
      </View>
      //INDIVIDUAL POSTS
      <view>
        <FlatList
          numColumns={2}
          data={myposts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          itemSeparatorComponent={separator}
          style={{ marginBottom: 110 }}
        />
      </view>
    </View>
  );
}
