const fs = require("fs").promises;
const FILE_PATH = "./data/todos.json";

const getTodos = async () => {
	try {
		const data = await fs.readFile(FILE_PATH, "utf-8");
		return JSON.parse(data);
	} catch (err) {
		console.error("Error reading todos:", err);
		return [];
	}
};

const createTodo = async (newItem) => {
	try {
		const todos = await getTodos();
		const updatedTodos = [
			...todos,
			{
				id: todos[todos.length - 1].id + 1,
				...newItem,
				completed: false,
			},
		];
		await fs.writeFile(FILE_PATH, JSON.stringify(updatedTodos, null, 4));
		return newItem;
	} catch (err) {
		console.error("Error creating todo:", err);
		return null;
	}
};

const deleteTodo = async (id) => {
	try {
		const todos = await getTodos();
		const updatedTodos = todos.filter((todo) => todo.id !== parseInt(id));
		if (updatedTodos.length === todos.length) {
			return 0;
		}

		await fs.writeFile(FILE_PATH, JSON.stringify(updatedTodos, null, 4));
		return id;
	} catch (err) {
		console.error("Error deleting todo:", err);
		return null;
	}
};

module.exports = { getTodos, createTodo, deleteTodo };
