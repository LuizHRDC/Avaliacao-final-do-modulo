import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import usersRouter from './routes/users.js';
import messagesRouter from './routes/messages.js';

// Ajuste para __dirname no ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'src')));

// Rota principal para exibir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.use('/', usersRouter);
app.use('/', messagesRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
