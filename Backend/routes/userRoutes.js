import express from "express";
import { UserController } from "../controllers/userController.js";

const router = express.Router();

router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.get("/", UserController.getAllUsers);
router.delete("/:id", UserController.deleteUser);
router.get("/search/name", UserController.searchUsersByName);

export default router;
