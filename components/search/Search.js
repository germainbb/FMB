import { collection } from 'firebase/firestore';
import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { db } from '../firebase';


function Search({navigation}) {
    const [users, setUsers] = useState(initialState)
    
   const fetchUsers = (search) => {
       const colRef =  collection(db,'users')
       const q = query(colRef, where("name", "==", search));
    }   
   
   
    return (
        <View>
            <Text>Hello</Text>
        </View>
        )
}

export default Search;
