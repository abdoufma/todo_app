import express from 'express';
import { deleteTodo,  getTodoById,  getTodos,  saveTodo,  updateTodo } from './db';
import { PUBLIC_DIR } from './utils';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(PUBLIC_DIR));

// GET all todos
app.get('/api/todos', (_, res) => {
    try {
        const todos = getTodos();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

// POST create todo
app.post('/api/todos', async (req, res) => {
    try {
        const saved = saveTodo(req.body);
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

// GET todo by ID
app.get('/api/todos/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const todo = getTodoById(id);
        res.json(todo);
    } catch (err) {
        res.status(404).json({ message: (err as Error).message });
    }
});

// PUT update todo
app.put('/api/todos/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const updated = updateTodo(id, req.body);
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const deleted = deleteTodo(id);
        res.status(200).json(deleted);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

const server = app.listen(port, () => console.log(`Server running at port ${port}`));

export default server;