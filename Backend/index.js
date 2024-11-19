	import express from "express";
	import { db } from "./firebaseConfig.js"; // Assuming your firebaseConfig is set up as you mentioned earlier
	import cors from 'cors';
	
	
	const app = express();
	app.use(express.json());
	app.use(cors());

	// Route to create a user
	app.post("/users", async (req, res) => {
		try {
			const { name, email, age, weight, height, healthGoals } = req.body;

			if (!name || !email || !age || !weight || !height || !healthGoals) {
				return res.status(400).json({ message: "All fields are required" });
			}
			console.log("Creating user:", name, email, age, weight, height, healthGoals);

			const docRef = db.collection("users").doc(); // Creates a new document with an auto-generated ID
			await docRef.set({
				name,
				email,
				age,
				weight,
				height,
				healthGoals,
				createdAt: new Date(),
			});

			res.status(201).json({
				id: docRef.id,
				name,
				email,
				age,
				weight,
				height,
				healthGoals,
			});
		} catch (error) {
			console.error("Error creating user:", error);
			res.status(500).json({ message: "Error creating user" });
		}
	});

	// Route to update a user
	app.put("/users/:id", async (req, res) => {
		const { id } = req.params;
		const { name, email, age, weight, height, healthGoals } = req.body;

		try {
			const userRef = db.collection("users").doc(id);
			const userDoc = await userRef.get();

			if (!userDoc.exists) {
				return res.status(404).json({ message: "User not found" });
			}

			await userRef.update({
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
	});

	// Route to get all users
	app.get("/users", async (req, res) => {
		try {
			const snapshot = await db.collection("users").get();
			const users = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			res.status(200).json(users);
		} catch (error) {
			console.error("Error getting users:", error);
			res.status(500).json({ message: "Error fetching users" });
		}
	});

	// Route to delete a user
	app.delete("/users/:id", async (req, res) => {
		const { id } = req.params;
		try {
			const userRef = db.collection("users").doc(id);
			const userDoc = await userRef.get();

			if (!userDoc.exists) {
				return res.status(404).json({ message: "User not found" });
			}

			await userRef.delete();
			res.status(200).json({ message: `User with ID ${id} deleted` });
		} catch (error) {
			console.error("Error deleting user:", error);
			res.status(500).json({ message: "Error deleting user" });
		}
	});

	app.get("/search/name", async (req, res) => {
		const { name } = req.query; // Get the name query parameter
	
		if (!name) {
			return res
				.status(400)
				.json({ message: "Name query parameter is required" });
		}
	
		try {
			const snapshot = await db
				.collection("users")
				.get();
	
			// Filter users on the server side based on a regex match (partial match)
			const regex = new RegExp(name, 'i'); // 'i' for case-insensitive matching
	
			const users = snapshot.docs
				.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))
				.filter((user) => regex.test(user.name)); // Filter based on regex
	
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
	});
	

	// Start server
	app.listen(3000, () => {
		console.log("Server running on http://localhost:3000");
	});
