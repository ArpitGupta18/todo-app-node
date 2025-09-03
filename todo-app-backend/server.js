const express = require("express");
const todoRoutes = require("./routes/todoRoutes.js");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Todo App");
});

app.use("/todos", todoRoutes);

app.listen(3000, () => {
	console.log("Server is running on port http://localhost:3000");
});
