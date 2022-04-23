const { Grupo, GrupoDAO } = require('../models/grupo');
const { GrupoParticipantesDAO } = require('../models/grupoParticipante');
const { MensagemDAO } = require('../models/mensagem');
const { User, UserDAO } = require('../models/user');
class GruposController {
    async listagem(req, res) {
        const user = req.session.user;
        const grupos = await GrupoDAO.exibirParticipa(user.id);
        console.log('grupos ',grupos);
        
        return res.render('listagem', { user: user, grupos: grupos });
    }

    async detalhar(req, res) {
        const user = req.session.user;
        const { id, page } = req.params;
        const grupos = await GrupoDAO.exibirParticipa(user.id);
        const grupo = await GrupoDAO.detalhar(id);
        const participantes = await GrupoParticipantesDAO.participantesGrupo(id);
        const mensagens = await MensagemDAO.mensagensGrupo(id, page);
        console.log('grupos ',grupos);
        console.log('grupo ',grupo);
        
        return res.render('detalhar', { user: req.session.user, grupos: grupos, grupo: grupo, participantes: participantes, mensagens: mensagens });
    }
    async cadastrar(req, res) {
        const user = req.session.user;
        const { grupo } = req.body;
        
        const addGroup = await GrupoDAO.cadastrar(grupo.nome, user.id,grupo.image);
        // return res.send('Deveria cadastrar um filme');
    }

    async addMember(req, res) {
        const user = req.session.user;
        const { newMember } = req.body;
        const memberExist = await UserDAO.buscaPeloEmail(newMember.email)
        if(memberExist){
            const addMember = await GrupoParticipantesDAO.adicionarUser(memberExist.id, newMember.grupo,newMember.tipo);
        }
        // return res.send('Deveria cadastrar um filme');
    }
}

module.exports = GruposController;
