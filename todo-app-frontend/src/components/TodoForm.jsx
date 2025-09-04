import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
const TodoForm = ({ handleAdd, onClose }) => {
	const [task, setTask] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [priority, setPriority] = useState("medium");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!task.trim()) {
			return;
		}

		handleAdd({ task, dueDate, priority });
		setTask("");
		setDueDate("");
		setPriority("medium");
		onClose();
	};

	return (
		<div className="drawer">
			<div className="drawer-header">
				<h3>Add New Todo</h3>
				<button onClick={onClose} className="close-btn">
					<FaTimes size={24} />
				</button>
			</div>

			<form onSubmit={handleSubmit} className="drawer-form">
				<div className="form-group">
					<label>Task:</label>
					<input
						type="text"
						value={task}
						onChange={(e) => setTask(e.target.value)}
						required
						placeholder="Enter task"
					/>
				</div>

				<div className="form-group">
					<label>Due Date:</label>
					<input
						type="date"
						value={dueDate}
						onChange={(e) => setDueDate(e.target.value)}
						min={new Date().toISOString().split("T")[0]}
					/>
				</div>

				<div className="form-group">
					<label>Priority:</label>
					<select
						value={priority}
						onChange={(e) => setPriority(e.target.value)}
					>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
				</div>

				<div className="form-buttons">
					<button
						type="button"
						onClick={onClose}
						className="cancel-btn"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="add-btn bg-indigo-500 hover:bg-indigo-600"
					>
						Add
					</button>
				</div>
			</form>
		</div>
	);
};

export default TodoForm;
