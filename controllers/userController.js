const {user, event} = require('../models');
const {Router} = require('express');

const roteador = Router();

// CRUD - Create, Read, Update, Delete

// READ: listar todos os usuários
roteador.get('/', async (req, res) => {
    try {
        const users = await user.findAll();
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

// CREATE: criar um novo usuário
roteador.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await user.findOne({
            where: {
                email: email,
                password: password
            }
        });

        if (existingUser) {
            alert("Já existe um usuário com esse email")
        } else {
            await user.create({ username, password, email });
            res.redirect("login")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

// UPDATE: atualizar um usuário
roteador.patch('/', async (req, res) => {
    const {idUsuario, password} = req.body;
    try {
        const existingUser = await user.findOne({
            where: {id: idUsuario}
        });

        if (!existingUser) {
            res.send('<h1>Usuário não encontrado</h1>');
        } else {
            await user.update({password}, {
                where: {id: idUsuario}
            });
            res.redirect('/usuario');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

// DELETE: deletar um usuário
roteador.delete('/', async (req, res) => {
    const {idUsuario} = req.body;
    try {
        const existingUser = await user.findOne({
            where: {id: idUsuario}
        });

        if (!existingUser) {
            res.send('<h1>Usuário não encontrado</h1>');
        } else {
            await user.destroy({
                where: {id: idUsuario}
            });
            res.redirect('/usuario');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

roteador.get('/login', (req, res) => {
    res.render('login')
})

roteador.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await user.findOne({
            where: {
                email: email,
                password: password
            }
        });

        if (existingUser) {
            const existingEvents = await event.findAll({
                where: {
                    idUser: existingUser.id
                }
            });            

            req.session.user = existingUser;

            res.render('homeUser', {existingEvents})
        } else {
            alert('usuario inexistente');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
})

roteador.get('/cadastro', (req, res) => {
    res.render('cadastro')
})

module.exports = roteador;
