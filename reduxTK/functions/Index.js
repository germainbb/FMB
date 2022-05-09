import { View, Text } from 'react-native'
import React from 'react'
import { auth, db } from '../firebase'
import {  collection, doc, getDoc, collectionGroup,
   query, where, getDocs, arrayRemove, arrayUnion, deleteDoc } from "firebase/firestore";  
import { useDispatch } from 'react-redux'
import { onSnapshot } from 'firebase/firestore'
import { fetchuser,  } from "../reducers/User";

//var dispatch = useDispatch()

export const fetchUser = async dispatch => {
  const dispatch = useDispatch()
  const user = auth.currentUser.uid
  const docRef = doc(db, 'users', user)
  const docSnap = getDoc(docRef)
  if (docSnap.exists()) {
    dispatch(fetchuser(user, ...docSnap.data))
    console.log('Document data:', docSnap.data())
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!')
  }
}

export const fetchUserPosts = (dispatch) => {
  const user = auth.currentUser.uid
  const colRef = collection(db, 'users', user, 'myposts')
  const q = query(colRef, orderBy('timeStamp', 'desc'))
  const docRef = await getDocs(q)
  const posts = onSnapshot(q, docQuery => {
    docQuery.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    })
  })
  dispatch(fetchUserPosts(posts))
}

export const fetchUserData = (uid, dispatch) => {
      const docRef = doc(db, 'users', uid)
      const docSnap = getDoc(docRef)
      if (docSnap.exists){
        dispatch(usersDataStateChange(docSnap.data))
      }
      else (console.log('user not here'))
    }

    
export const fetchLikes = (uid, postId) => {
      
     const handleLike = (postId, uid) => {
       const currentLikeState = !post.likes.includes(
        auth.currentUser.uid
       )
        const docRef = doc(db,'users', uid, 'myposts', postId)
       let listener = updateDoc(docRef, {
         likes: currentLikeState 
         ? arrayUnion(auth.currentUser.email) 
         : arrayRemove(auth.currentUser.email)
       }).then(() => {
         console.log('document updated')
       }, (error) => {
          console.log('error updating document: ', error);
       })
      }
}
// export const queryusersbyusername = (username) => {

// }
export const deletePost = (item) => {

}
export const fetchAllPosts = () => {
  
    const posts = query(collectionGroup(db, 'myposts'), orderBy('timeStamp', 'desc'));
    const querySnapshot = await getDocs(posts);
    const allPosts = querySnapshot.map((doc) => {
        const data = doc.data()
        const id = doc.id
        return({id, ...data})
    })
    dispatch(fetchAllPosts(allPosts))
  
}


