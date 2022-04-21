const bcrypt = require('bcrypt');
const { User, UserDAO } = require('../models/user');

class UsersController {
    async cadastrar(req, res) {
        console.log('UsersController/cadastrar');

        const { nome, email, senha, imagem } = req.body;
        const novaSenha = bcrypt.hashSync(senha, 10); 
        
        const user = new User(null, nome, email, novaSenha, imagem, null);
        const cadastro = await UserDAO.cadastrar(user);

        res.redirect('/');
    }

    async login(req, res) {
        const { email, senha } = req.body;
        
        const user = await UserDAO.buscaPeloEmail(email);
        if (!user) return res.send('User nao encontrado');

        const confere = bcrypt.compareSync(senha, user.senha);
        if (confere) {
            req.session.user = user;
            return res.send('Usuario e senha confirmados, vc fez o login');
        } else {
            return res.send('Senha nao confere...');
        }
        
    }
}

module.exports = UsersController;
