const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const validator = require("validator");

const DBClient = require('../utils/DB/DBClient');

const table = 'todos';

const exist = async (uuid) => {
  const exist_query = `SELECT uuid FROM ${table} WHERE uuid=?`;

  const values = [uuid];

  try {
    todo = await DBClient.one(exist_query, values);
    return (todo === undefined);
  } catch (error) {
    return error;
  }
}

const get_all_todos = async (res, where = "1=1", order_by = "created_at", direction = "DESC") => {
  const query = `SELECT * FROM ${table} WHERE ${where} ORDER BY ${order_by} ${direction}`;
  let todos;

  try {

    todos = await DBClient.all(query);

  } catch (error) {

    console.error(error);

    throw new Error(error);

  }

  res.status(200).json({ message: "ok", data: todos, count: todos.length, links: { self: { href: `${process.env.HOST}:${process.env.PORT}`, rel: "self", type: "GET" } } });
}

const get_one_todo = async (res, uuid) => {
  const query = `SELECT * FROM ${table} WHERE UUID = ?`;
  const values = [uuid];
  let todo;

  try {

    todo = await DBClient.all(query, values);

  } catch (error) {

    console.error(error);

    throw new Error(error);

  }

  res.status(200).json({ message: "ok", data: todo, links: { collection: { href: `${process.env.HOST}:${process.env.PORT}/todos/`, rel: "collection", type: "GET" }, self: { href: `${process.env.HOST}:${process.env.PORT}/todos/${uuid}`, rel: "self", type: "GET" } } });
}

router.get('/', async (req, res, next) => {
  try {
    return await get_all_todos(res);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/:uuid', async (req, res, next) => {

  const { uuid } = req.params;

  if (!validator.isUUID(uuid)) {
    return res.sendStatus(400);
  }

  try {
    if (await !exist(uuid)) return res.sendStatus(404);
  } catch (error) {
    return res.sendStatus(500);
  }

  try {
    return await get_one_todo(res, uuid);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res, next) => {
  const { content } = req.body;

  const uuid = uuidv4();
  const create_query = `INSERT INTO ${table} (uuid,content,completed, created_at, updated_at) VALUES (?,?,?, NOW(), null)`;

  const values = [uuid, content, false];

  try {
    await DBClient.query(create_query, values);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  try {
    return await get_all_todos(res);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

});

router.put('/:uuid', async (req, res, next) => {

  const { uuid } = req.params;

  if (!validator.isUUID(uuid)) {
    return res.sendStatus(400);
  }

  try {
    if (await !exist(uuid)) return res.sendStatus(404);
  } catch (error) {
    return res.sendStatus(500);
  }

  const { completed, content } = req.body;

  const update_query = `UPDATE ${table} SET content=?, completed=?, updated_at=NOW() WHERE uuid=?`;
  const values = [content, completed, uuid];

  try {
    await DBClient.query(update_query, values);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  try {
    return await get_one_todo(res, uuid);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

});

router.delete('/:uuid', async (req, res, next) => {

  const { uuid } = req.params;

  try {
    if (await !exist(uuid)) return res.sendStatus(404);
  } catch (error) {
    return res.sendStatus(500);
  }

  if (!validator.isUUID(uuid)) {
    return res.sendStatus(400);
  }

  const delete_query = `DELETE FROM ${table} WHERE uuid=?`;
  const values = [uuid];

  try {
    await DBClient.query(delete_query, values);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  return await get_all_todos(res);

});

module.exports = router;