import express from 'express'

import cors from 'cors'



import usersRouter from './routes/users'

import messagesRouter from './routes/messages'

import welcomeRouter from './routes/welcome'



const app = express();


const PORT = 3400;



app.use(cors())

app.use(express.json())



app.use('/', welcomeRouter)

app.use('/', usersRouter);

app.use('/', messagesRouter)



app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`)

})