const { where } = require('sequelize');
const {event} = require('../models');
const {Router} = require('express');

const roteador = Router();

// CRUD - Create, Read, Update, Delete

// READ: listar todos os usuários
roteador.get('/', async (req, res) => {
    try {
        const events = await event.findAll();
        res.send(events);
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

// UPDATE: atualizar um usuário
roteador.patch('/', async (req, res) => {
    const {idUsuario, password} = req.body;
    try {
        const existingUser = await event.findOne({
            where: {id: idUsuario}
        });

        if (!existingUser) {
            res.send('<h1>Usuário não encontrado</h1>');
        } else {
            await event.update({password}, {
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
        const existingUser = await event.findOne({
            where: {id: idUsuario}
        });

        if (!existingUser) {
            res.send('<h1>Usuário não encontrado</h1>');
        } else {
            await event.destroy({
                where: {id: idUsuario}
            });
            res.redirect('/usuario');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

roteador.get('/newEvent', (req, res) => {
    res.render('newEvent')
})

roteador.post('/', async (req, res) => {
    const {date, description} = req.body;
    try {
        const user = req.session.user;
        await event.create({idUser: user.id, date: date, description: description});
        const existingEvents = await event.findAll({
            where: {
                idUser: user.id
            }
        });     
        res.render('homeUser', {existingEvents});
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Erro interno do servidor</h1>');
    }
});

roteador.get('/editEvent', async (req, res) => {
    const idEvent = req.query;

    const existingEvents = await event.findOne({
        where:{
            id: idEvent.idEvent
        }
    })
    // res.send(existingEvents)
    res.render('editEvent', {existingEvents})
})

module.exports = roteador;
