const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let projects = []; // tymczasowa baza w pamięci
let idCounter = 1;

// Pobierz wszystkie projekty
app.get('/projects', (req, res) => {
  res.json(projects);
});

// Dodaj nowy projekt
app.post('/projects', (req, res) => {
  const { name, status, difficulty } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const project = { id: idCounter++, name, status, difficulty };
  projects.push(project);
  res.status(201).json(project);
});

// Edytuj projekt
app.put('/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const project = projects.find(p => p.id === id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  const { name, status, difficulty } = req.body;
  if (name !== undefined) project.name = name;
  if (status !== undefined) project.status = status;
  if (difficulty !== undefined) project.difficulty = difficulty;
  res.json(project);
});

// Usuń projekt
app.delete('/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  projects = projects.filter(p => p.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
