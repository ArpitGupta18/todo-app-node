const express = require("express");
const {
	getTodos,
	createTodo,
	deleteTodo,
	toggleTodo,
} = require("../controllers/todoController.js");

const router = express.Router();

router.get("/", async (req, res) => {
	const todos = await getTodos();
	const { search } = req.query;

	if (search) {
		const filteredTodos = todos.filter((todo) =>
			todo.task.toLowerCase().includes(search.toLowerCase())
		);
		return res.status(200).json(filteredTodos);
	}
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

router.patch("/toggle/:id", async (req, res) => {
	const { id } = req.params;
	const toggledTodo = await toggleTodo(id);
	if (toggledTodo) {
		res.status(200).json({ message: "Todo toggled successfully" });
	} else {
		res.status(404).send({ Error: "Todo Not Found" });
	}
});

module.exports = router;
