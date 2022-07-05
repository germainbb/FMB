import React from 'react';
import { Text, Dimensions, StyleSheet, View } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const Carousel = () => (
  <View style={styles.container}>
    <SwiperFlatList autoplay autoplayDelay={3} autoplayLoop index={2} showPagination>
      <View style={[styles.child, { backgroundColor: 'tomato' }]}>
        <Text style={styles.text}>1</Text>
      </View>
      <View style={[styles.child, { backgroundColor: 'thistle' }]}>
        <Text style={styles.text}>2</Text>
      </View>
      <View style={[styles.child, { backgroundColor: 'skyblue' }]}>
        <Text style={styles.text}>3</Text>
      </View>
      <View style={[styles.child, { backgroundColor: 'teal' }]}>
        <Text style={styles.text}>4</Text>
      </View>
    </SwiperFlatList>
  </View>
);

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', height: height*0.25 },
  child: { width, justifyContent: 'center' },
  text: { fontSize: width * 0.1, textAlign: 'center' },
});

export default Carousel;