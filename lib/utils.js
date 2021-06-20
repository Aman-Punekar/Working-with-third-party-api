const axios = require("axios");
require("dotenv").config();
const TODO = process.env.TODO;
const USER = process.env.USER;

/**getUser:
 * fetches the user info of the given id
 * if no user with the given id then returns an empty object
 */
const getUser = async (id) => {
  try {
    const userInfoUrl = USER + id;
    const user = await axios.get(userInfoUrl);
    return user.data;
  } catch (err) {
    if (err.message === "Request failed with status code 404") return {};
    throw err;
  }
};

// Returns the matched todos without the userIds
const getMatchedTodos = async (userId) => {
  try {
    var matchedTodos = [];
    const todosArr = await axios.get(TODO);
    const todos = todosArr.data;
    for (var obj in todos) {
      if (todos[obj]["userId"] == userId) {
        delete todos[obj].userId;
        matchedTodos.push(todos[obj]);
      }
    }

    return matchedTodos;
  } catch (err) {
    throw err;
  }
};

module.exports = { getUser, getMatchedTodos };
