import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAfH3n-sz7-NL4ogbwLlaCXwu75rAaSVlY",
  authDomain: "vue-doit.firebaseapp.com",
  projectId: "vue-doit",
  storageBucket: "vue-doit.appspot.com",
  messagingSenderId: "843603946743",
  appId: "1:843603946743:web:3867b02bb41834ce00b7f2"
};



initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  set,
  child,
  get,
  update,
  onValue,
  remove
} from "firebase/database";
const db = getDatabase(),
  refDb = ref,
  setDb = set,
  childDb = child,
  getDb = get,
  updateDb = update,
  onValueDb = onValue,
  removeDb = remove;
export { db, refDb, setDb, childDb, getDb, updateDb, onValueDb, removeDb };
