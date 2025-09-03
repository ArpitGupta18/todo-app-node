const express = require("express");
const {
	getTodos,
	createTodo,
	deleteTodo,
} = require("../controllers/todoController.js");

const router = express.Router();

router.get("/", async (req, res) => {
	const todos = await getTodos();
	res.status(200).json(todos);
});

router.post("/", async (req, res) => {
	const newItem = req.body;
	const createdItem = await createTodo(newItem);
	res.status(201).json(createdItem);
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const deletedTodo = await deleteTodo(id);
	if (deletedTodo) {
		res.status(204).send();
	} else {
		res.status(404).send({ Error: "TodoNot Found" });
	}
});
module.exports = router;
