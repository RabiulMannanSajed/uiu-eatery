// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//     // apiKey: import.meta.env.VITE_apiKey,
//     // authDomain: import.meta.env.VITE_authDomain,
//     // projectId: import.meta.env.VITE_projectId,
//     // storageBucket: import.meta.env.VITE_storageBucket,
//     // messagingSenderId: import.meta.env.VITE_messagingSenderId,
//     // appId: import.meta.env.VITE_appId
//     apiKey: "AIzaSyDHMjwaYFfVqCFEc01yLpWsCiqikgTcwlo",
//     authDomain: "uiu-eatery.firebaseapp.com",
//     projectId: "uiu-eatery",
//     storageBucket: "uiu-eatery.appspot.com",
//     messagingSenderId: "956817132092",
//     appId: "1:956817132092:web:79102ddaa776ad83bfd139"

// };

// // we have to export this
//  const app = initializeApp(firebaseConfig);

//  export default app
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAoO6om-vGH9GUEVsUjYlzhKpgOy4L8LKQ",
    authDomain: "cars-doctor-afb56.firebaseapp.com",
    projectId: "cars-doctor-afb56",
    storageBucket: "cars-doctor-afb56.appspot.com",
    messagingSenderId: "406128661858",
    appId: "1:406128661858:web:ad07dfd4b3c8a6697b083b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;