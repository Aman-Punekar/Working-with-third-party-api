require("dotenv").config();
const request = require("request");
const axios = require("axios");
const { getUser, getMatchedTodos } = require("../lib/utils");

const TODO = process.env.TODO;


/** getTodos :
 * Calls third party api receiving array of objects in string form.
 * The result is Json parsed.
 * from each json object the userId is deleted
 */
const getTodos = async (req, res) => {
  try {
    console.log(`this is TODO: ${TODO}`);
    const todosObj = await axios(TODO);
    const todos = todosObj.data;
    for (let obj in todos) {
      delete todos[obj].userId;
    }
    return res.status(200).send(todos);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getUserTodos = async (req, res) => {
  try {
    const userInfo = await getUser(req.params.userId);
    console.log(`in controllers ${userInfo.id}`);
    if (!userInfo.id) {
      console.log("no user");
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
