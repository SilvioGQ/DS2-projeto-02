const bcrypt = require('bcrypt');
const { Grupo, GrupoDAO } = require('../models/grupo');

class GruposController {
    async listagem(req, res) {
        const user = req.session.user;
        console.log('user ',user);
        const grupos = await GrupoDAO.exibirParticipa(1);
        
        return res.render('listagem', { user: req.session.user, grupos: grupos });
    }
}

module.exports = GruposController;
