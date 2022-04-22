const { Grupo, GrupoDAO } = require('../models/grupo');

class GruposController {
    async listagem(req, res) {
        const user = req.session.user;
        console.log('user ',user);
        const grupos = await GrupoDAO.exibirParticipa(user.id);
        
        return res.render('listagem', { user: user, grupos: grupos });
    }
}

module.exports = GruposController;
