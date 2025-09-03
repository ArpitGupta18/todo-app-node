const express = require("express");
const todoController = require("../controllers/todoController.js");

const router = express.Router();

router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.delete("/:id", todoController.deleteTodo);
router.patch("/toggle/:id", todoController.toggleTodo);

module.exports = router;
