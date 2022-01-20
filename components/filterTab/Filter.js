import React, { useState } from 'react'
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'
//import { FlatList } from 'react-native-gesture-handler'

const listTab = [{ status: 'all' }, { status: 'purple'}, { status: 'green' }, { status: 'red'}, { status: 'black'}]
const data = [
  {
    name: 'germain',
    status: 'purple'
  },
  {
    name: 'is',
    status: 'all'
  },
  {
    name: 'cool',
    status: 'green'
  }
]
const Filter = () => {
  const [status, setstatus] = useState('all')
  const [datalist, setDatalist] = useState(data)
  const setstatusFilter = status => {
    if (status !== 'all') {
      //purple and green
      setDatalist([...data.filter(e => e.status === status)])
    } else {
      setDatalist(data)
    }
    setstatus(status)
  }
  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <View style={styles.itemLogo}>
          <Image
            style={styles.itemImage}
            source={{
              uri:
                'https://dks.scene7.com/is/image/GolfGalaxy/18NIKMNBLKRSLBRNYLAL?qlt=70&wid=600&fmt=pjpeg'
            }}
          />
        </View>
        <View style={styles.itemBody}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <View
          style={[
            styles.itemStatus,
            {
              backgroundColor: item.status === 'purple' ? 'purple' : '#69c080'
            }
          ]}
        >
          <Text>{item.status}</Text>
        </View>
      </View>
    )
  }
  const separator = () => {
    return <View style={{ height: 1, backgroundColor: 'pink' }}></View>
  }

  return (
    <View style={{margin:5}}>
      <ScrollView horizontal>
          <View style={styles.listTab}>
            {listTab.map((e) => (
              <TouchableOpacity
                style={[
                  styles.btnTab,
                  status === e.status && styles.btnTabActive
                ]}
                onPress={() => setstatusFilter(e.status)}
              >
                <Text
                  style={[
                    styles.textTab,
                    status === e.status && styles.textTabActive
                  ]}
                >
                  {e.status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        
      </ScrollView>
      <FlatList
        numColumns={2}
        data={datalist}
        keyExtractor={index => index.toString()}
        renderItem={renderItem}
        itemSeparatorComponent={separator}
      />
    </View>
  )
}

export default Filter

const styles = StyleSheet.create({
  listTab: {
    flexDirection: 'row',
    alignSelf: 'center',
    //marginBottom: 20
  },
  btnTab: {
    width: Dimensions.get('window').width / 3.5,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 10,
    justifyContent: 'center'
  },
  textTab: {
    color: 'blue',
    fontSize: 15
  },
  btnTabActive: {
    borderBottomWidth: 4
  },
  textTabActive: {
    color: 'black'
  },
  itemContainer: {
    //padding: 2,
    width: '45%',
    margin: 5,
    backgroundColor: 'white', 
  },
  itemLogo: {
    padding: 10
  },
  itemImage: {
    width: 120,
    height: 120
  },
  itemBody: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  itemStatus: {
    backgroundColor: 'green',
    justifyContent: 'center',
    padding: 3
  }
})
