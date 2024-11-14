import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { validateUserRegistration, validateUserLogin } from './../middlewares/validationUsers'

const router = express.Router();
export const users = [];

router.post('/signup', validateUserRegistration, async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword
    };

    users.push(newUser);

    res.status(201).json({
        message: `Seja bem-vindo ${name}! Pessoa usuária registrada com sucesso!`
    });
});

router.post('/login', /* validateUserLogin, */ async (req, res) => {
    const { email, password } = req.body;

    const existingUser = users.find(user => user.email === email);
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
        return res.status(400).json({ error: "Senha incorreta, tente novamente." });
    }

    res.status(200).json({
        message: `Seja bem-vindo ${existingUser.name}! Pessoa usuária logada com sucesso!`,
        userId: (existingUser.id), 
        email: (existingUser.email)
      });
      
});

export default router;