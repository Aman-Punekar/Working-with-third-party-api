require("dotenv").config();
const axios = require("axios");
const { getUser, getMatchedTodos } = require("../lib/utils");

const TODO = process.env.TODO;

/** getTodos :
 * Calls third party api receiving array of objects.
 * from each json object the userId is deleted
 */
const getTodos = async (req, res) => {
  try {
    const todosObj = await axios.get(TODO);
    const todos = todosObj.data;
    for (let obj in todos) {
      delete todos[obj].userId;
    }
    return res.status(200).send(todos);
  } catch (err) {
    return res.status(400).send(err);
  }
};

/** getUsesrTodos
 * gets the user info of the given userId
 * if there is no user with the given userId returns an empty object
 * Otherwise gets the array of objects containing todos matching to the given userId
 * Both the data is combined and sent as the result
 */
const getUserTodos = async (req, res) => {
  try {
    const userInfo = await getUser(req.params.userId);

    if (!userInfo.id) {
      return res.status(200).send(userInfo);
    }

    const matchedTodos = await getMatchedTodos(req.params.userId);
    userInfo.todos = matchedTodos;
    return res.status(200).send(userInfo);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { getTodos, getUserTodos };
