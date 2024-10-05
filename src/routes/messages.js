import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { users } from './users';
import { messageRegistration, readMessages, updateMessages, deleteMessages } from './../middlewares/validationMessages'

const router = express.Router();
export const messages = [];

router.post('/message', messageRegistration, (req, res) => {
    const { email, title, description } = req.body;

    const newMessage = {
        id: uuidv4(),
        title,
        description,
        email
    };

    messages.push(newMessage);

    res.status(201).json({
        message: `Mensagem criada com sucesso!`,
        note: newMessage
    });
});

router.get('/message/:email', readMessages, (req, res) => {
    const { email } = req.params;

    const existingUser = users.find(user => user.email === email);

    const userMessages = messages.filter(msg => msg.email === existingUser.email);
    if (userMessages !== -1) {
        res.status(200).json({
            message: `Seja bem-vindo!`,
            notes: userMessages
        });
    }
});

router.put('/message/:id', updateMessages, (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const messageIndex = messages.findIndex(msg => msg.id === id);

    messages[messageIndex].title = title;
    messages[messageIndex].description = description;

    res.status(200).json({
        message: `Mensagem atualizada com sucesso!`,
        note: messages[messageIndex]
    });
});

router.delete('/message/:id', deleteMessages, (req, res) => {

    res.status(200).json({ message: "Mensagem apagada com sucesso." });
});

export default router;