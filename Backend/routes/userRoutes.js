import express from "express";
import {
	createUser,
	updateUser,
	getAllUsers,
	deleteUser,
	searchUsersByName,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/users/search", searchUsersByName);

export default router;
