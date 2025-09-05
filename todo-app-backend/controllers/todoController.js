const repo = require("../repositories/todoRepository");

function isValidDate(d) {
	return !isNaN(new Date(d).getTime());
}

const getTodos = async (req, res) => {
	try {
		let todos = await repo.getAllTodos();
		const { search, page = 1, limit = 8 } = req.query;

		if (search) {
			todos = todos.filter((todo) =>
				todo.task.toLowerCase().includes(search.toLowerCase())
			);
		}

		const pageNum = parseInt(page);
		const limitNum = parseInt(limit);

		const startIndex = (pageNum - 1) * limitNum;
		const endIndex = pageNum * limitNum;

		const paginatedTodos = todos.slice(startIndex, endIndex);

		res.status(200).json({
			page: pageNum,
			limit: limitNum,
			totalTodos: todos.length,
			totalPages: Math.ceil(todos.length / limitNum),
			todos: paginatedTodos,
		});
	} catch (err) {
		console.error("Error getting todos:", err);
		res.status(500).json({ error: "Failed to fetch todos" });
	}
};

const createTodo = async (req, res) => {
	try {
		// const newItem = req.body;
		const { task, dueDate, priority } = req.body;

		if (!task || task.trim() === "") {
			return res.status(400).json({ error: "Task cannot be empty" });
		}

		const todos = await repo.getAllTodos();
		const exists = todos.some(
			(t) => t.task.toLowerCase() === task.trim().toLowerCase()
		);
		if (exists) {
			return res.status(409).json({ error: "Task already exists" });
		}

		if (dueDate && !isValidDate(dueDate)) {
			return res.status(400).json({ error: "Invalid due date" });
		}

		const allowedPriorities = ["low", "medium", "high"];
		if (priority && !allowedPriorities.includes(priority.toLowerCase())) {
			return res
				.status(400)
				.json({ error: "Priority must be low, medium or high" });
		}

		const createdItem = await repo.addTodo({
			task: task.trim(),
			dueDate: dueDate
				? new Date(dueDate).toISOString().split("T")[0]
				: null,
			priority: priority ? priority.toLowerCase() : "medium",
		});

		res.status(201).json(createdItem);
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
		res.status(200).json({
			message: "Todo toggled successfully",
			task: toggledTodo,
		});
	} catch (err) {
		res.status(500).json({ error: "Failed to toggle todo" });
	}
};

module.exports = { getTodos, createTodo, deleteTodo, toggleTodo };
