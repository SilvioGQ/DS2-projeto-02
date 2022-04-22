const middlewareUser = (req, res, next) => {
    const user = req.session.user;
    console.log(user)
    if(user){
        next();
    } else res.redirect('/login.html');
};

const { GrupoDAO } = require('../models/grupo');

const middlewareParticipant = (req, res, next) => {
    const user = req.session.user;
    const { id } = req.params;

    if(user){
        const getGrupos = async () => {
            let grupos = await GrupoDAO.exibirParticipa(user.id);
            if(grupos.find(item => item.id == id)){
                console.log('Está no grupo ',grupos);
                next();
            } else {
                console.log('Está no grupo ',grupos);
                res.redirect('/grupos');
            }
        }
        getGrupos();
    } else res.redirect('/login.html');
};

module.exports = { middlewareUser, middlewareParticipant };