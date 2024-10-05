import express from 'express'
import cors from 'cors'

import usersRouter from './routes/users'
import messagesRouter from './routes/messages'
import welcomeRouter from './routes/welcome'

const app = express();
const PORT = 3700;

app.use(cors())
app.use(express.json())

app.use('/', welcomeRouter)
app.use('/users', usersRouter);
app.use('/messages', messagesRouter)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})