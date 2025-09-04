import React from "react";
import { FaTrash } from "react-icons/fa";
const TodoItem = ({ todo, handleDelete, handleToggle }) => {
	const priorityColors = {
		low: "bg-green-100 text-green-700",
		medium: "bg-yellow-100 text-yellow-700",
		high: "bg-red-100 text-red-700",
	};

	const isOverdue =
		todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

	return (
		<tr className="border-t hover:bg-gray-50 transition-colors">
			<td className="p-3 text-center">
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={() => handleToggle(todo.id)}
					className="w-5 h-5 accent-indigo-600 cursor-pointer"
				/>
			</td>

			<td className="p-3">
				<span
					className={`font-medium ${
						todo.completed
							? "line-through text-gray-400"
							: "text-gray-900"
					}`}
				>
					{todo.task}
				</span>
			</td>

			<td className="p-3">
				<span
					className={`px-4 py-1.5 rounded-full text-sm font-medium ${
						priorityColors[todo.priority]
					}`}
				>
					{todo.priority.charAt(0).toUpperCase() +
						todo.priority.slice(1)}
				</span>
			</td>

			<td className="p-3 text-sm">
				{todo.dueDate ? (
					<span
						className={`${
							isOverdue
								? "text-red-500 font-medium"
								: "text-gray-700"
						}`}
					>
						{new Date(todo.dueDate).toLocaleDateString()}
					</span>
				) : (
					<span className="text-gray-400">No Due Date</span>
				)}
			</td>

			<td className="p-3 text-center">
				<button
					onClick={() => handleDelete(todo.id)}
					className="px-3 py-2.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
				>
					<FaTrash />
				</button>
			</td>
		</tr>
	);
};

export default TodoItem;
