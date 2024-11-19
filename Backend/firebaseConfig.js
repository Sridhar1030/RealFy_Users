import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";


dotenv.config();

// Construct the service account credentials from the .env variables
const serviceAccount = {
	type: process.env.FIREBASE_TYPE,
	project_id: process.env.FIREBASE_PROJECT_ID,
	private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
	private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Ensures proper line breaks
	client_email: process.env.FIREBASE_CLIENT_EMAIL,
	client_id: process.env.FIREBASE_CLIENT_ID,
	auth_uri: process.env.FIREBASE_AUTH_URI,
	token_uri: process.env.FIREBASE_TOKEN_URI,
	auth_provider_x509_cert_url: process.env.FIREBASE_CERT_URL,
	client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
	universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

const firebaseApp = initializeApp({
	credential: cert(serviceAccount),
});

const db = getFirestore(firebaseApp);

export { db };
