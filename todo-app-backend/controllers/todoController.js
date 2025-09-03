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
				id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
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

const toggleTodo = async (id) => {
	const todos = await getTodos();
	const index = todos.findIndex((todo) => todo.id === parseInt(id));

	if (index === -1) {
		return 0;
	}

	todos[index].completed = !todos[index].completed;

	await fs.writeFile(FILE_PATH, JSON.stringify(todos, null, 4));
	return id;
};

module.exports = { getTodos, createTodo, deleteTodo, toggleTodo };
