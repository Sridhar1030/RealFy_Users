import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

//test route
app.get("/", (req, res) => {
	res.send("Hello World!");
}
);

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
