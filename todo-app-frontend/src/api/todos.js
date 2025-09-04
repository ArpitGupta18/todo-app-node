const API_BASE_URL = "http://localhost:3000/todos";

export const getTodos = async (page = 1, limit = 8, search = "") => {
	const params = new URLSearchParams({ page, limit });
	if (search) {
		params.append("search", search);
	}

	const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
	if (!response.ok) {
		throw new Error("Failed to fetch todos");
	}
	return response.json();
};

// const data = await getTodos(1, 3, "groceries");
// console.log(typeof data);

export const addTodo = async (todo) => {
	const response = await fetch(API_BASE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(todo),
	});
	if (!response.ok) {
		throw new Error("Failed to add todo");
	}
	return response.json();
};

export const deleteTodo = async (id) => {
	const response = await fetch(`${API_BASE_URL}/${id}`, {
		method: "DELETE",
	});
	if (!response.ok) {
		throw new Error("Failed to delete todo");
	}
};

export const toggleTodoStatus = async (id) => {
	const response = await fetch(`${API_BASE_URL}/toggle/${id}`, {
		method: "PATCH",
	});
	if (!response.ok) {
		throw new Error("Failed to toggle todo status");
	}
	return response.json();
};
