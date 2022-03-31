import { useNavigation } from '@react-navigation/native'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { auth } from '../firebase'
import {
  collection,
  addDoc
} from 'firebase/firestore'
import { db } from '../firebase'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('account created')
        const user = userCredential.user
        console.log(user)
      })
      .catch(error => {
        console.log(error)
        Alert.alert(error.message)
      })
  }

  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('signed in')
        const user = userCredential.user
        console.log(user)
        await addDoc(collection(db, 'users'), {
          email: email
        })
        .then(() => console.log('this is the email'))
        .catch(() => {
          console.log('rejected')
        })

        navigation.navigate('home');
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <Text></Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={
            handleCreateAccount
          }
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            handleSignIn
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  button: {
    backgroundColor: 'orange',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 2
  },
  buttonOutlineText: {}
})
