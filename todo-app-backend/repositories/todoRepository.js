const fs = require("fs").promises;
const path = require("path");
const FILE_PATH = path.join(__dirname, "../data/todos.json");

const readTodos = async () => {
	try {
		const data = await fs.readFile(FILE_PATH, "utf-8");
		return JSON.parse(data);
	} catch (err) {
		console.error("Error reading todos:", err);
		return [];
	}
};

const writeTodos = async (todos) => {
	fs.writeFile(FILE_PATH, JSON.stringify(todos, null, 4));
};

const getAllTodos = async () => {
	return await readTodos();
};

const addTodo = async (newItem) => {
	const todos = await readTodos();
	const newTodo = {
		id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
		...newItem,
		completed: false,
	};
	todos.push(newTodo);
	await writeTodos(todos);
	return newTodo;
};

const removeTodo = async (id) => {
	const todos = await readTodos();
	const updatedTodos = todos.filter((t) => t.id !== parseInt(id));
	if (updatedTodos.length === todos.length) {
		return 0;
	}
	await writeTodos(updatedTodos);
	return id;
};

const toggleTodoStatus = async (id) => {
	const todos = await readTodos();
	const index = todos.findIndex((t) => t.id === parseInt(id));

	if (index === -1) {
		return null;
	}

	todos[index].completed = !todos[index].completed;
	await writeTodos(todos);
	return todos[index];
};

module.exports = {
	getAllTodos,
	addTodo,
	removeTodo,
	toggleTodoStatus,
};
