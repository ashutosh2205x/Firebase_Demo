import firestore from '@react-native-firebase/firestore'

export const firestoreDB = firestore().collection('users')
