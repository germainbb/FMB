import { View, Image,Text, Dimensions, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import { FlatList } from 'react-native-gesture-handler'
import Animated,{interpolate,Extrapolate,useSharedValue, event } from 'react-native-reanimated'

const srcwidth = Dimensions.get("window").width
const cardLength = srcwidth*0.8
const spacing = srcwidth*0.02
const sidecardLength = (srcwidth*0.18)/2





const MyPager = ({navigation}) => {
  const [scrollx, setscrollx] = useState(0)

  function Item({index}){
    const size = useSharedValue(0.8)
  
    const inputRange = [
      (index -1)*cardLength,
      index*cardLength,
      (index + 1) * cardLength
    ]
    size.value = interpolate(
      scrollx,
      inputRange,
      [0.8,1,0.8],
      Extrapolate.CLAMP
    )
  
    return(
      <View style={[styles.card, {
        marginLeft: index == 0 ? sidecardLength : spacing,
        marginRight: index == 2 ? sidecardLength : spacing,
      }]}>
        <Image 
          resizeMode='contain'
          source={require("../../assets/clapping.png")}
          style={{width: "100%", height: "100%", backgroundColor:"lightblue"}}
        />
      </View>
    )
  }

  const Data = [
    {
      id: "1",
      title: "first"
    },
    {
      id: "2",
      title: "second"
    },
    {
      id: "3",
      title: "third"
    },
  ]

  return (
    <View>
      <FlatList
        data={Data}
        horizontal={true}
        renderItem={({index, item})=>{
          return(
            <Item index={index} scrollx={scrollx}/>
          )
        }}
        keyExtractor={(item) => item.id}
        onScroll={(event)=> {
          setscrollx(event.nativeEvent.contentOffset.x)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: cardLength,
    height: 150,
    overflow: "hidden",
  }
});

export default MyPager