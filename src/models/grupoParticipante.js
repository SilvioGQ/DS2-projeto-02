const { dbcon } = require("../config/connection-db");

class GrupoParticipantes {
    constructor(id, user, grupo, tipo, dataregister) {
        this.id = id;
        this.user = user;
        this.grupo = grupo;
        this.tipo = tipo;
        this.dataregister = dataregister;
    }
}

class GrupoParticipantesDAO {
    static async buscaPeloGrupo(grupo) {
        const sql = 'SELECT * FROM grupoParticipantes where grupo = $1';
        const result = await dbcon.query(sql, [grupo]);
        const grupo = result.rows[0];
        return grupo;
    }

    static async atualizaParticipante(grupo, user) {
        const sql = `UPDATE grupoParticipantes
            SET user = $2, 
                tipo = $3
            WHERE grupo = $1;`;
        const values = [grupo, user.id, user.tipo];
        
        try {
            await dbcon.query(sql, values);
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        }
    }

    static async adicionarUser(user, grupo, tipo) {
        const sql = 'INSERT INTO public.grupoParticipantes (user, grupo, tipo) VALUES ($1, $2, $3);';
        const values = [user, grupo, tipo];
        
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('NAO FOI POSSIVEL INSERIR');
            console.log({ error });
            return false;
        }
    }
}

module.exports = {
    GrupoParticipantes,
    GrupoParticipantesDAO
};