const repo = require("../repositories/todoRepository");

const getTodos = async (req, res) => {
	try {
		let todos = await repo.getAllTodos();
		const { search } = req.query;

		if (search) {
			todos = todos.filter((todo) =>
				todo.task.toLowerCase().includes(search.toLowerCase())
			);
		}
		res.status(200).json(todos);
	} catch (err) {
		console.error("Error getting todos:", err);
		res.status(500).json({ error: "Failed to fetch todos" });
	}
};

const writeTodosToFile = (todos) => {
	fs.writeFile(FILE_PATH, JSON.stringify(todos, null, 4));
};

const createTodo = async (req, res) => {
	try {
		const newItem = req.body;
		const { task } = newItem;

		if (!task || task.trim() === "") {
			return res.status(400).json({ error: "Task cannot be empty" });
		}

		const todos = await repo.getAllTodos();

		const exists = todos.some(
			(t) => t.task.toLowerCase() === task.trim().toLowerCase()
		);

		if (exists) {
			return res.status(400).json({ error: "Task already exists" });
		}
		const createdItem = repo.addTodo({ ...newItem, task: task.trim() });
		const created = await createdItem;
		res.status(201).json(created);
	} catch (err) {
		res.status(500).json({ error: "Failed to create todos" });
	}
};

const deleteTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await repo.removeTodo(id);
		if (!deleted) {
			return res.status(404).send({ Error: "Todo Not Found" });
		}
		res.status(204).send();
	} catch (err) {
		res.status(500).json({ error: "Failed to delete todo" });
	}
};

const toggleTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const toggledTodo = await repo.toggleTodoStatus(id);

		if (!toggledTodo) {
			return res.status(404).send({ Error: "Todo Not Found" });
		}
		res.status(200).json({ message: "Todo toggled successfully" });
	} catch (err) {
		res.status(500).json({ error: "Failed to toggle todo" });
	}
};

module.exports = { getTodos, createTodo, deleteTodo, toggleTodo };
