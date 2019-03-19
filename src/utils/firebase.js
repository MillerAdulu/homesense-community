import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBXSb-QmCx3JjvUJBCkoPmqfEOFZkzgygw',
  authDomain: 'homesense-community.firebaseapp.com',
  databaseURL: 'https://homesense-community.firebaseio.com',
  projectId: 'homesense-community',
  storageBucket: 'homesense-community.appspot.com',
  messagingSenderId: '278750838291'
}

export default firebase.initializeApp(config).messaging()
