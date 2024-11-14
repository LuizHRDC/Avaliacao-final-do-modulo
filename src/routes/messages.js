import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { users } from './users';
import { messageRegistration, readMessages, updateMessages, deleteMessages } from './../middlewares/validationMessages'

const router = express.Router();
export const messages = [];

router.post('/message', /* messageRegistration, */ (req, res) => {
    const { title, description, userId } = req.body;

    const newMessage = {
        id: uuidv4(), // Gerar um id único
        title,
        description,
        userId
    };

    messages.push(newMessage);

    res.status(201).json({
        message: `Mensagem criada com sucesso!`,
        note: newMessage
    });
});



router.get('/messages/:email', (request, response) => {

    const { email } = request.params

    const { page, perPage } = request.query

    const user = users.find(user => user.email === email)
    
    if(!user){
        return response.status(404).json({
            message: 'Usuário não encontrado.'
        })
    }

    const currentPage = parseInt(page) || 1 // padrão 1
    const itemsPerPage = parseInt(perPage) || 10 // padrão 10

    const userNotes = messages.filter(message => message.email === email)

    const totalItems = userNotes.length

    const startIndex = (currentPage - 1) * itemsPerPage

    const endIndex = startIndex + itemsPerPage

    const paginatedNotes = userNotes.slice(startIndex, endIndex)

    const totalPages = Math.ceil(totalItems/itemsPerPage)

    response.status(200).json({
        messages: paginatedNotes,
        totalPages,
        currentPage
    })

})

// router.get('/message/:email', readMessages, (req, res) => {
//     const { email } = req.params;

//     const existingUser = users.find(user => user.email === email);

//     const userMessages = messages.filter(msg => msg.email === existingUser.email);
//     if (userMessages !== -1) {
//         res.status(200).json({
//             message: `Seja bem-vindo!`,
//             notes: userMessages
//         });
//     }
// });

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

router.get('/details/:id', (request, response) => {
    const { id } = request.params

    const note = messages.find(note => note.id === id)

    if (!note) {
        return response.status(404).json({
            message: 'Recado não encontrado.'
        })
    }

    response.status(200).json(note)
})

export default router;