import React from "react";
import { View, StyleSheet, Animated } from "react-native";

class Loader extends React.Component {
  defaultImageAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);

  handleDefaultImageLoad = () => {
    Animated.timing(this.defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  handleImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { defaultImageSource, source, style, ...props } = this.props;
    return (
      <View>
        <Animated.Image
          {...props}
          source={defaultImageSource}
          style={[style, { opacity: this.defaultImageAnimated }]}
          onLoad={this.handleDefaultImageLoad}
          blurRadius={1}
        />
        <Animated.Image
          {...props}
          source={source}
          style={[style, { opacity: this.imageAnimated }, styles.imageOverlay]}
          onLoad={this.handleImageLoad}
        />
      </View>
    );
  }
}

export default Loader;

const styles = StyleSheet.create({
  imageOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
