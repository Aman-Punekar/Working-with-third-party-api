const express = require('express');
const router = express.Router();
const {getTodos, getUserTodos} = require("../controllers/todos");



router.get("/todos", getTodos );
router.get("/user/:userId", getUserTodos);

module.exports = router;