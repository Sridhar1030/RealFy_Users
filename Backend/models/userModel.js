export const UserModel = {
	create: (data) => userCollection.doc().set(data),
	findById: (id) => userCollection.doc(id).get(),
	updateById: (id, data) => userCollection.doc(id).update(data),
	deleteById: (id) => userCollection.doc(id).delete(),
	getAll: () => userCollection.get(),

	// Method to find users by email
	findByEmail: (email) => userCollection.where("email", "==", email).get(),
};
