import { useState, useEffect } from "react";
import { getTodos, deleteTodo, toggleTodoStatus, addTodo } from "../api/todos";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { FaSearch } from "react-icons/fa";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [page, setPage] = useState(1);
	const [limit] = useState(8);
	const [totalPages, setTotalPages] = useState(1);
	const [search, setSearch] = useState("");
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	useEffect(() => {
		getTodos(page, limit, search)
			.then((data) => {
				setTodos(data.todos);
				setTotalPages(data.totalPages);
			})
			.catch((error) => {
				console.error("Error fetching todos:", error);
			});
	}, [page, search, limit]);

	const handleDelete = async (id) => {
		try {
			await deleteTodo(id);
			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error("Error deleting todo:", error);
		}
	};

	const handleToggle = async (id) => {
		try {
			const updatedTodo = await toggleTodoStatus(id);
			console.log(updatedTodo);
			setTodos((prev) =>
				prev.map((todo) => (todo.id === id ? updatedTodo.task : todo))
			);
		} catch (error) {
			console.error("Error toggling todo:", error);
		}
	};

	const handleAdd = async (newTodo) => {
		try {
			const addedTodo = await addTodo(newTodo);
			setTodos((prev) => [addedTodo, ...prev]);
			setIsDrawerOpen(false);
		} catch (error) {
			console.error("Error adding todo:", error);
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h2 className="font-bold text-3xl">Todo List</h2>

				<div className="flex items-center gap-4">
					<div className="flex items-center border rounded-xl p-2 px-4 gap-2">
						<input
							type="text"
							placeholder="Search todos..."
							value={search}
							onChange={(e) => {
								setPage(1);
								setSearch(e.target.value);
							}}
							className="outline-none"
						/>
						<FaSearch />
					</div>
					<button
						onClick={() => setIsDrawerOpen(true)}
						className="border px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
					>
						+ Add Todo
					</button>
				</div>
			</div>

			<div className="bg-white shadow-md rounded-lg overflow-hidden border mt-12">
				<table className="min-w-full border-collapse">
					<thead>
						<tr className="bg-gray-100 text-left text-gray-600 text-sm uppercase font-semibold">
							<th className="p-3 w-12">Done</th>
							<th className="p-3">Task</th>
							<th className="p-3">Priority</th>
							<th className="p-3">Due Date</th>
							<th className="p-3 text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{todos.map((todo) => (
							<TodoItem
								key={todo.id}
								todo={todo}
								handleDelete={handleDelete}
								handleToggle={handleToggle}
							/>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex items-center justify-center gap-4 mt-6">
				<button
					onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
					disabled={page === 1}
					className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
						page === 1
							? "bg-gray-200 text-gray-400 cursor-not-allowed"
							: "bg-indigo-500 text-white hover:bg-indigo-600"
					}`}
				>
					Prev
				</button>

				<span className="text-sm font-medium text-gray-700">
					Page <span className="font-bold">{page}</span> of{" "}
					<span className="font-bold">{totalPages}</span>
				</span>

				<button
					onClick={() =>
						setPage((prev) => Math.min(prev + 1, totalPages))
					}
					disabled={page === totalPages}
					className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
						page === totalPages
							? "bg-gray-200 text-gray-400 cursor-not-allowed"
							: "bg-indigo-500 text-white hover:bg-indigo-600"
					}`}
				>
					Next
				</button>
			</div>

			{isDrawerOpen && (
				<TodoForm
					handleAdd={handleAdd}
					onClose={() => setIsDrawerOpen(false)}
				/>
			)}
		</div>
	);
};

export default TodoList;
