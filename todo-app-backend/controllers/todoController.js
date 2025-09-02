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

module.exports = { getTodos };
