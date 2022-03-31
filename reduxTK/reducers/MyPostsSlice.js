import { createSlice } from '@reduxjs/toolkit'
import {auth } from '../firebase'
import { doc, getDoc, orderBy, query } from "firebase/firestore";

const initialState = {
  myPosts: []
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    user: (state, action) => {
      return {
        ...state,
        currentUser: action.currentUser
      }
    },
    fetchUser: (state, action) => {

      const user = auth.currentUser.uid
      const docRef = doc(db, "users", user);
      const q = query(docRef, orderBy('timeStamp', 'desc'))
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        onSnapshot(q, (snapshot) => {

        })
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      return {
        ...state,
        currentUser: action.currentUser
      }
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { user, fetchUser, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer

// const initialState = {
//     currentUser: null
// }

// export const user = (state = initialState, action) => {
//     return {
//         ...state,
//         currentUser: action.currentUser
//     }
// }






