const { dbcon } = require("../config/connection-db");

class Grupo {
    constructor(id, nome, admin, imagem, dataregister) {
        this.id = id;
        this.nome = nome;
        this.admin = admin;
        this.imagem = imagem;
        this.dataregister = dataregister;
    }
}

class GrupoDAO {
    static async buscaPeloId(id) {
        const sql = 'SELECT * FROM grupo where id = $1';
        const result = await dbcon.query(sql, [id]);
        const grupo = result.rows[0];
        return grupo;
    }

    static async atualiza(grupo) {
        const sql = `UPDATE grupo
            SET nome = $2, 
                admin = $3,
                imagem = $4
            WHERE id = $1;`;
        const values = [grupo.id, grupo.nome, grupo.admin, grupo.imagem];
        
        try {
            await dbcon.query(sql, values);
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        }
    }

    static async cadastrar(grupo) {
        const sql = 'INSERT INTO public.grupo (nome, admin, imagem, dataregister) VALUES ($1, $2, $3, $4);';
        const values = [grupo.nome, grupo.admin, grupo.imagem, grupo.dataregister];
        
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
    Grupo,
    GrupoDAO
};