const bcrypt = require('bcrypt');
const { Grupo, GrupoDAO } = require('../models/grupo');
const { GrupoParticipantesDAO } = require('../models/grupoParticipante');
const { MensagemDAO } = require('../models/mensagem');

class GruposController {
    async listagem(req, res) {
        const user = req.session.user;
        const grupos = await GrupoDAO.exibirParticipa(user.id);
        console.log('grupos ',grupos);
        
        return res.render('listagem', { user: req.session.user, grupos: grupos });
    }

    async detalhar(req, res) {
        const user = req.session.user;
        const { id, page } = req.params;
        const grupos = await GrupoDAO.exibirParticipa(user.id);
        const grupo = await GrupoDAO.detalhar(id);
        const participantes = await GrupoParticipantesDAO.participantesGrupo(id);
        const mensagens = await MensagemDAO.mensagensGrupo(id, page);
        console.log('grupos ',grupos);
        
        return res.render('detalhar', { user: req.session.user, grupos: grupos, grupo: grupo, participantes: participantes, mensagens: mensagens });
    }
}

module.exports = GruposController;
