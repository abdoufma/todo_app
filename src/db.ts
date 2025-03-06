import { Database } from "bun:sqlite";
import { homedir } from "os";

const dbPath = homedir() + "/Desktop/todo.db";
console.log("Database path : `%s`", dbPath);

const db = new Database(dbPath, {create: true, readwrite : true});
// import db from "../main.db" with { type: "sqlite", embed: "true" };

class Todo {
  constructor(public id: number, public text: string, public completed: boolean) { }
}

db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0
);`);

const encodeTodo = (todo: Todo) => ({...todo, completed : todo.completed ? 1 : 0});
const decodeTodo = (todo: any) => ({...todo, completed : todo?.completed ? true : false});


export function getTodoById(id: number) {
  const foundTodo = db.query(`SELECT * FROM todos WHERE id = ?`).as(Todo).get(id);
  if (!foundTodo) throw new Error("Todo not found");
  return decodeTodo(foundTodo);
}

export function saveTodo(todo: Todo) {
  console.log("saving new todo : `%s`", todo.text);
  return db.query(`INSERT INTO todos (text, completed) VALUES (?, ?)`).run(todo.text, todo.completed);
}

export function getTodos() {
  return db.
  query(`SELECT * FROM todos`)
  .all()
  .map(decodeTodo);
}

export function updateTodo(id : number, todo: Todo) {
  return db.query(`UPDATE todos SET text = ?, completed = ? WHERE id = ?`).run(todo.text, todo.completed, id);
}

export function deleteTodo(id: number) {
  return db.query(`DELETE FROM todos WHERE id = ?`).run(id);
}


async function test() {
  // const query = db.query(`INSERT INTO todos (text, completed) VALUES (?, ?)` );;
  // db.query(`UPDATE todos SET text = ?, completed = ? WHERE id = ?`).run("Buy eggs (updated again)",  true, 2);
  const todos = db.query(`SELECT * FROM todos`).as(Todo).all();
  console.log(todos);
}


export const closeDb = db.close.bind(db);

// test();
