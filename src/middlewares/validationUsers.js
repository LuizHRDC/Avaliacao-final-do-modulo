import { users } from '../routes/users'

export function validateUserRegistration(req, res, next) {
    const { name, email, password } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Por favor, verifique se passou o nome." });
    }

    if (!email) {
        return res.status(400).json({ error: "Por favor, verifique se passou o email." });
    }

    if (!password) {
        return res.status(400).json({ error: "Por favor, verifique se passou a senha." });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'Email já cadastrado, insira outro.' });
    }

    next();
}

export function validateUserLogin(req, res, next) {
    const { email, password } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Por favor, insira a senha." });
    }

    if (!email) {
        return res.status(400).json({ error: "Insira um e-mail válido." });
    }

    const existingUser = users.find(user => user.email === email);
    if (!existingUser) {
        return res.status(400).json({ error: "Email não encontrado no sistema, verifique ou crie uma conta." });
    }

    next();
}
