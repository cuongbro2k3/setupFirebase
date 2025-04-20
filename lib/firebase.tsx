import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyAAmF7FBMAwbh31CvJv00g1OnkcMuc0Qxk",
  authDomain: "firtsgame-a8a7d.firebaseapp.com",
  databaseURL: "https://firtsgame-a8a7d-default-rtdb.firebaseio.com",
  projectId: "firtsgame-a8a7d",
  storageBucket: "firtsgame-a8a7d.appspot.com",
  messagingSenderId: "1060444600761",
  appId: "1:1060444600761:web:2669721f585ca208f7de68"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Auth với persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Khởi tạo các dịch vụ khác
const db = getDatabase(app);
const storage = getStorage(app);

export { auth, db, storage };