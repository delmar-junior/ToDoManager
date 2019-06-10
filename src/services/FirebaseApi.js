import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBj-xILeE3iTzZP7IpRJjnPBIr63iLHTmk",
  authDomain: "todomanager-5ece2.firebaseapp.com",
  databaseURL: "https://todomanager-5ece2.firebaseio.com",
  projectId: "todomanager-5ece2",
  storageBucket: "todomanager-5ece2.appspot.com",
  messagingSenderId: "42134428421",
};

export const initializeFirebaseApi = () => firebase.initializeApp(config);

export const creatUserOnFirebaseAsync = async (email, password) => {
  const { user } = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)

  return user;
}

export async function signInOnFirebaseAsync(email, password) {
  const user = await firebase.auth().signInWithEmailAndPassword(email, password);
  return user;
}

export const currentFirebaseUser = () => {
  return new Promise((resolve, reject) => {
    var unsubscribe = null;
    unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => {
        resolve(user);
      }, (error) => {
        reject(error);
      }, () => {
        unsubscribe();
      });
  })
}

export const writeTaskOnFirebaseAsync = async (task) => {
  const user = await currentFirebaseUser();

  var tasksReference = firebase
    .database()
    .ref(user.uid);

  const key = task.key ? 
    task.key : 
    tasksReference
      .child('tasks')
      .push()
      .key;

  return await tasksReference
    .child(`tasks/${key}`)
    .update(task);
}

export const readTaskFromFirebaseAsync = async (listener) => {
  const user = await currentFirebaseUser();

  var tasksReference = firebase
    .database()
    .ref(user.uid)
    .child('tasks');
  
  tasksReference.on('value', (snapshot) => {
    var tasks = []; 
    snapshot.forEach(function (element) {
      var task = element.val(); 
      task.key = element.key; 
      tasks.push(task);
    });
    listener(tasks);
  });
}