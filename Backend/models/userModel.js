import { db } from "../config/firebaseConfig.js";

const userCollection = db.collection("users");

export const UserModel = {
	create: (data) => userCollection.doc().set(data),
	findById: (id) => userCollection.doc(id).get(),
	updateById: (id, data) => userCollection.doc(id).update(data),
	deleteById: (id) => userCollection.doc(id).delete(),
	getAll: () => userCollection.get(),
	findByEmail: (email) => userCollection.where("email", "==", email).get(),
};
