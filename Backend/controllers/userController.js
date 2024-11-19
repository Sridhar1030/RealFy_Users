import { UserModel } from "../models/userModel.js";

export const UserController = {
	createUser: async (req, res) => {
		try {
			const { name, email, age, weight, height, healthGoals } = req.body;

			// Validate required fields
			if (!name || !email || !age || !weight || !height || !healthGoals) {
				return res
					.status(400)
					.json({ message: "All fields are required" });
			}

			// Check for existing user with the same email
			const existingUserSnapshot = await UserModel.findByEmail(email);
			if (!existingUserSnapshot.empty) {
				return res
					.status(400)
					.json({ message: "User with this email already exists" });
			}

			// Create the new user
			const newUser = {
				name,
				email,
				age,
				weight,
				height,
				healthGoals,
				createdAt: new Date(),
			};

			await UserModel.create(newUser);

			res.status(201).json(newUser);
		} catch (error) {
			console.error("Error creating user:", error);
			res.status(500).json({ message: "Error creating user" });
		}
	},

	updateUser: async (req, res) => {
		const { id } = req.params;
		const { name, email, age, weight, height, healthGoals } = req.body;

		try {
			const userDoc = await UserModel.findById(id);

			if (!userDoc.exists) {
				return res.status(404).json({ message: "User not found" });
			}

			await UserModel.updateById(id, {
				name,
				email,
				age,
				weight,
				height,
				healthGoals,
			});

			res.status(200).json({
				id,
				name,
				email,
				age,
				weight,
				height,
				healthGoals,
			});
		} catch (error) {
			console.error("Error updating user:", error);
			res.status(500).json({ message: "Error updating user" });
		}
	},

	getAllUsers: async (req, res) => {
		try {
			const snapshot = await UserModel.getAll();
			const users = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			res.status(200).json(users);
		} catch (error) {
			console.error("Error fetching users:", error);
			res.status(500).json({ message: "Error fetching users" });
		}
	},

	deleteUser: async (req, res) => {
		const { id } = req.params;

		try {
			const userDoc = await UserModel.findById(id);

			if (!userDoc.exists) {
				return res.status(404).json({ message: "User not found" });
			}

			await UserModel.deleteById(id);

			res.status(200).json({ message: `User with ID ${id} deleted` });
		} catch (error) {
			console.error("Error deleting user:", error);
			res.status(500).json({ message: "Error deleting user" });
		}
	},

	searchUsersByName: async (req, res) => {
		const { name } = req.query;

		if (!name) {
			return res
				.status(400)
				.json({ message: "Name query parameter is required" });
		}

		try {
			// Use Firestore query for case-insensitive partial match
			const snapshot = await UserModel.getByName(name);

			// Map Firestore results to an array of user objects
			const users = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			if (users.length === 0) {
				return res
					.status(404)
					.json({ message: "No users found with that name" });
			}

			res.status(200).json(users);
		} catch (error) {
			console.error("Error searching users:", error);
			res.status(500).json({ message: "Error searching users" });
		}
	},
};
