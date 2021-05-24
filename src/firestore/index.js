import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// var firebaseConfig = {
//     apiKey: "AIzaSyCV9WUkTm4Do-1rZxITZtVsER85n5ImtbI",
//     authDomain: "reshare-react.firebaseapp.com",
//     projectId: "reshare-react",
//     storageBucket: "reshare-react.appspot.com",
//     messagingSenderId: "622795321112",
//     appId: "1:622795321112:web:25d2c12af751b0e811b86d"
//   };
  const firebaseConfig = {
    apiKey: "AIzaSyCZcLEZrFifeGFRo2xbB5RP0wqzP5VQpP0",
    authDomain: "share-react-e94e9.firebaseapp.com",
    projectId: "share-react-e94e9",
    storageBucket: "share-react-e94e9.appspot.com",
    messagingSenderId: "542918287644",
    appId: "1:542918287644:web:1cb58fa3417e8750fe9ad9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export async function signInWithGoogle(){
  const provider = new firebase.auth.GoogleAuthProvider();
   await auth.signInWithPopup(provider);
   window.location.reload();
}

export function checkAuth(cb){
 return  auth.onAuthStateChanged(cb);

}

export async function logOut(){
    await auth.signOut();
    window.location.reload();
}

export async function getCollection(id) {
 const snapshot =   await db.collection(id).get();
const data = snapshot.docs.map(doc => ({id : doc.id, ...doc.data() })  );
console.log(data);
}

export async function getUserLists(userId){
    const snapshot =   await db.collection("lists").where('author', '==', userId).get();
  return snapshot.docs.map(doc => ({id : doc.id, ...doc.data() })  );
//   console.log(data);
}

export async function getFriendsLists(userId){
  const snapshot = await db.collection("friends").get();
  return snapshot.docs.map(doc => ({id : doc.id, ...doc.data() })  );
}
function uploadCoverImage (file){
    var f= file.name;
const uploadTask=   storage
// .ref('images/${file.name}')
  .ref('images/' + file.name)
  .put(file);
  
 return new Promise((resolve, reject) => {
    uploadTask.on(
        "state_changed", 
    (snapshot) => console.log("image uploading", snapshot),
    reject,
     () => {
        storage.ref('images').child(f)
        .getDownloadURL()
        .then(resolve)
      } 
     );

  });
 
}
export async function  createLists(list , user ){
   const {name, description , image} = list;

  await db.collection('lists').add({
       name,
       description,
       issued: '',
       image: image ? await  uploadCoverImage(image) : null,
       created: firebase.firestore.FieldValue.serverTimestamp(),
       author: user.uid,
       userIds: [user.uid],
       users: [
           {
           id: user.uid,
           name: user.displayName
       }
    ]
   })
}


export function subscribeToListItems(){
    return db.collection("lists")
    .doc(listId)
    .collection(items)
    .orderBy('created', 'desc')
    .onSnapshot(cb)
}

export async function addFriendToList(user,listId){
    await db.collection("lists").doc(listId).update({
        userIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
        users: firebase.firestore.FieldValue.arrayUnion({
         id: user.uid,
         name: user.displayName   
         }) 
    })
}