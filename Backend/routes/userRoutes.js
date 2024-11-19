import express from "express";
import { getAllUsers,createUser,updateUser,deleteUser,searchUsersByName } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.put("/:id", updateUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.get("/search/name", searchUsersByName);

export default router;
