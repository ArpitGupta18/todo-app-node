const fs = require("fs").promises;
const path = require("path");
const FILE_PATH = path.join(__dirname, "../data/todos.json");

const getTodos = async () => {
	try {
		const data = await fs.readFile(FILE_PATH, "utf-8");
		return JSON.parse(data);
	} catch (err) {
		console.error("Error reading todos:", err);
		return [];
	}
};

const writeTodosToFile = (todos) => {
	fs.writeFile(FILE_PATH, JSON.stringify(todos, null, 4));
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
		await writeTodosToFile(updatedTodos);
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

		await writeTodosToFile(updatedTodos);
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

	await writeTodosToFile(todos);
	return id;
};

module.exports = { getTodos, createTodo, deleteTodo, toggleTodo };
