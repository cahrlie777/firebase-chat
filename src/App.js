import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyDcm2awOageC0oRjrULTEfh5COEP6-wzlI",
    authDomain: "quickstart-1559947277345.firebaseapp.com",
    databaseURL: "https://quickstart-1559947277345.firebaseio.com",
    projectId: "quickstart-1559947277345",
    storageBucket: "quickstart-1559947277345.appspot.com",
    messagingSenderId: "599870878483",
    appId: "1:599870878483:web:5c4b800d30747b4d3b20e6",
    measurementId: "G-BN2PSH2CHZ"
});

const auth = firebase.auth();
const firestore = firebase.firestore();



function App() {

  const[user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        {user ? <ChatRoom/> : <SignIn/>}
      </header>
    </div>
  );
}
function SignIn(){

  const signInWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={()=> auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom(){
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'});
  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} messages={msg}/>)}
      </div>
    </>
  )
}

function ChatMessage(props){
  const {text, uid} = props.messages
  return <p>{text}</p>
}

export default App;
