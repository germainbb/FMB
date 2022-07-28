import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");
const Help = () => {
  return (
    <ScrollView>
      <Text style={styles.text}>1.How Set up your seller details first</Text>
      <Text style={{padding:10, fontSize: width * 0.05}}>
        a.Tap on the dashboard icon{'\n'}
        b.Tap on the pencil icon{'\n'}
        c.Type in your business details and upload your user/shop image{'\n'}
        d.Submit and start posting your products.{'\n'} 
      </Text>
      <Text style={styles.text}>2.Uploading a Post</Text>
      <Text style={{padding:10, fontSize: width * 0.05}}>
        a.Tap the plus icon{'\n'}
        b.Fill in the form as requested and pick or take a pic{'\n'}
        c.After filling everything, hit the post button and wait{'\n'}
        d.After a few seconds, depending your network, you'll be alerted that your upload has succeeded{'\n'}
        e.To see your upload, tap the home icon and once you're there PULL DOWN TO REFRESH the list{'\n'}     
      </Text>
      <Text style={styles.text}>3.Delete a post if the item has been sold </Text>
      <Text style={{padding:10, fontSize: width * 0.05}}>
        a.Tap the dashboard icon{'\n'}
        b.Tap the image you want to delete{'\n'}
        c.When the pop up comes hit delete{'\n'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: width * 0.1, textAlign: "center", color:"green" },
});

export default Help;

