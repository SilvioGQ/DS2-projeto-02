const { Router } = require('express');
const GruposController = require('../controllers/grupo-controllers');
const { middlewareUser } = require('../middlewares/middlewares');

const routes = Router();

const gruposController = new GruposController();

// routes.get('/cadastrar', gruposController.mostraCadastro);

// routes.get('/deletar/:id', gruposController.deletar);

routes.get('/', middlewareUser, gruposController.listagem);

// routes.get('/:id', gruposController.detalhar);

// routes.post('/', gruposController.cadastrar);

// routes.get('/alterar/:id', gruposController.mostraAlterar);
// routes.post('/alterar/:id', gruposController.alterar);

module.exports = routes;