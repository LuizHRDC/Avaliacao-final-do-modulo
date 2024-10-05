import { messages } from '../routes/messages'
import { users } from '../routes/users'

export function messageRegistration(req, res, next) {
    const { email, title, description } = req.body;

    const existingUser = users.find(user => user.email === email);
    if (!existingUser) {
        return res.status(404).json({ error: "Email não encontrado, verifique ou crie uma conta." });
    }

    if (!title) {
        return res.status(400).json({ error: "Título é obrigatório." });
    }

    if (!description) {
        return res.status(400).json({ error: "Descrição é obrigatória." });
    }

    next();
}

export function readMessages(req, res, next) {
    const { email } = req.params;

    const existingUser = users.find(user => user.email === email);
    if (!existingUser) {
        return res.status(404).json({ message: "Email não encontrado, verifique ou crie uma conta." });
    }

    next();
}

export function updateMessages(req, res, next){
    const { id } = req.params;
    const { title, description } = req.body;

    const messageIndex = messages.findIndex(msg => msg.id === id);
    if (messageIndex === -1) {
        return res.status(404).json({ message: "Por favor, informe um id válido da mensagem." });
    }

    if (!title || !description) {
        return res.status(400).json({ message: "Título e descrição são obrigatórios." });
    }

    next()
}

export function deleteMessages(req, res, next){
    const { id } = req.params;

    const messageIndex = messages.findIndex(msg => msg.id === id);
    if (messageIndex === -1) {
        return res.status(404).json({ message: "Mensagem não encontrada, verifique o identificador em nosso banco." });
    }

    messages.splice(messageIndex, 1);

    next()
}