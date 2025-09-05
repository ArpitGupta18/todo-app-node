import React from "react";
import TodoList from "./components/TodoList";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
	return (
		<div className="w-full min-h-screen px-20 py-10 bg-gray-100">
			<TodoList />
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</div>
	);
};

export default App;
