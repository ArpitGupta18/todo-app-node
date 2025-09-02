const express = require("express");
const { getTodos } = require("../controllers/todoController.js");

const router = express.Router();

router.get("/", async (req, res) => {
	const todos = await getTodos();
	res.json(todos);
});

module.exports = router;
