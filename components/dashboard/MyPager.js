import React from "react";
import { Text, Dimensions, StyleSheet, View, Image } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const MyPager = () => (
  <View style={styles.container}>
    <SwiperFlatList index={2} showPagination>
      <View style={[styles.child, { backgroundColor: "tomato" }]}>
        <Image
          resizeMode="contain"
          style={styles.itemImage}
          source={{
            uri: "https://dks.scene7.com/is/image/GolfGalaxy/18NIKMNBLKRSLBRNYLAL?qlt=70&wid=600&fmt=pjpeg",
          }}
        />
      </View>
      <View style={[styles.child, { backgroundColor: "thistle" }]}>
        <Image
          resizeMode="contain"
          style={styles.itemImage}
          source={{
            uri: "https://dks.scene7.com/is/image/GolfGalaxy/18NIKMNBLKRSLBRNYLAL?qlt=70&wid=600&fmt=pjpeg",
          }}
        />
      </View>
      <View style={[styles.child, { backgroundColor: "skyblue" }]}>
        <Image
          resizeMode="contain"
          style={styles.itemImage}
          source={{
            uri: "https://dks.scene7.com/is/image/GolfGalaxy/18NIKMNBLKRSLBRNYLAL?qlt=70&wid=600&fmt=pjpeg",
          }}
        />
      </View>
      <View style={[styles.child, { backgroundColor: "teal" }]}>
        <Image
          resizeMode="contain"
          style={styles.itemImage}
          source={{
            uri: "https://dks.scene7.com/is/image/GolfGalaxy/18NIKMNBLKRSLBRNYLAL?qlt=70&wid=600&fmt=pjpeg",
          }}
        />
      </View>
      <View style={[styles.child, { backgroundColor: "teal" }]}>
        <Image
          resizeMode="contain"
          style={styles.itemImage}
          source={{
            uri: "https://dks.scene7.com/is/image/GolfGalaxy/18NIKMNBLKRSLBRNYLAL?qlt=70&wid=600&fmt=pjpeg",
          }}
        />
      </View>
      <View style={[styles.child, { backgroundColor: "teal" }]}>
        <Image
          resizeMode="contain"
          style={styles.itemImage}
          source={{
            uri: "https://dks.scene7.com/is/image/GolfGalaxy/18NIKMNBLKRSLBRNYLAL?qlt=70&wid=600&fmt=pjpeg",
          }}
        />
      </View>
      <View style={[styles.child, { backgroundColor: "teal" }]}>
        <Image
          resizeMode="contain"
          style={styles.itemImage}
          source={{
            uri: "https://dks.scene7.com/is/image/GolfGalaxy/18NIKMNBLKRSLBRNYLAL?qlt=70&wid=600&fmt=pjpeg",
          }}
        />
      </View>
      <View style={[styles.child, { backgroundColor: "teal" }]}>
        <Image
          resizeMode="contain"
          style={styles.itemImage}
          source={{
            uri: "https://dks.scene7.com/is/image/GolfGalaxy/18NIKMNBLKRSLBRNYLAL?qlt=70&wid=600&fmt=pjpeg",
          }}
        />
      </View>
    </SwiperFlatList>
  </View>
);

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, bottom: 70 },
  child: { width, justifyContent: "center" },
  text: { fontSize: width * 0.1, textAlign: "center" },
  itemImage: {
    width: width,
    height: height * 0.7,
    top: height * 0.04,
  },
});

export default MyPager;
