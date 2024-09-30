import express, { request } from 'express'
import cors from 'cors'
import {v4 as uuidv4} from 'uuid'

const app = express()
app.use(cors())
app.use(express.json())

const users = []
const messages = []

app.get('/', (request, response) => {
    return response.status(200).json({
        message: "Bem vindo à aplicação"
    })
})

app.post('/signup', (request, response) => {
    const {name, email, password} = request.body
    if (!name) {
        return response.status(400).json({
            error: "Por favor, verifique se passou o nome."
        })
    }
    if (!email) {
        return response.status(400).json({
            error: "Por favor, verifique se passou o email."
        })
    }
    const existingEmail = users.find(user => user.email === email)
    if (existingEmail) {
        return response.status(400).json({message: 'Email já cadastrado, insira outro.'})
    }
    if (!password) {
        return response.status(400).json({
            error: "Por favor, verifique se passou a senha."
        })
    }
    const newUser = {
        id: uuidv4(),
        name,
        email,
        password
    }
    users.push(newUser)
    return response.status(201).json({
        message: `Seja bem vindo ${ name } ! Pessoa usuária registrada com sucesso!`
    })
})

app.post('/login', (request, response) => {
    const {email, password} = request.body

    if(!email) {
        return response.status(400).json({
            error: "Insira um e-mail válido."
        })
    }
    const existingUser = users.find(user => user.email === email)
    if (!existingUser) {
        return response.status(400).json({
            error: "Email não encontrado no sistema, verifique ou crie uma conta"
        })
    }
    if(!password){
        return response.status.apply(400).json({
            error: "Insira uma senha válida"
        })
    }

    if (password !== existingUser.password) {
        return response.status(400).json({
            error: "Senha incorreta, tente novamente."
        });
    }

    return response.status(200).json({message: `Seja bem vindo ${existingUser.name} ! Pessoa usuária logada com sucesso!`})
})

app.post('/message', (request, response) => {
    const { email, title, description} = request.body

    const existingUser = users.find(user => user.email === email)
    if (!existingUser){
        return response.status(404).json({
            error: "Email não encontrado, verifique ou crie uma conta"
        })
    }
    if (!title){
        return response.status(400).json({
            error: "Título é obrigatório"
        })
    }
    if (!description){
        return response.status(400).json({
            error: "Descrição é obrigatória"
        })
    }

    const newMessage = {
        id: uuidv4(),
        title,
        description
    }
    messages.push(newMessage)
    return response.status(201).json({
        message: `Mensagem criada com sucesso! ${newMessage.description}`
    })
})

app.get('/message/:email', (request, response) => {
    const { email } = request.params;
    const existingUser = users.find(user => user.email === email);

    if (!existingUser) {
        return response.status(404).json({
            message: "Email não encontrado, verifique ou crie uma conta"
        });
    }

    // Retorna todas as mensagens
    return response.status(200).json({
        message: `Seja bem-vinde! ${messages.map(msg => msg.description).join(' | ')}`
    });
});


app.listen(3700, () => {
    console.log('Servidor funcionando na porta 3700!')
})