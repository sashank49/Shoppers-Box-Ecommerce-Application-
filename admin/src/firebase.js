import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC0vxKJx1mShFb-rJUV9fU2d2xqa-kbPi4",
	authDomain: "lama-dev-ecommerce.firebaseapp.com",
	projectId: "lama-dev-ecommerce",
	storageBucket: "lama-dev-ecommerce.appspot.com",
	messagingSenderId: "193477417072",
	appId: "1:193477417072:web:b2c66f0928c8b445f3fcb5",
	measurementId: "G-LMVGRVJ467",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
