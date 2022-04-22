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
    static async exibirTodos() {
        const sql = 'SELECT * FROM public.grupo';
        const result = await dbcon.query(sql);
        const grupos = result.rows;
        return grupos;
    }

    static async buscaPeloId(id) {
        const sql = 'SELECT * FROM public.grupo where id = $1';
        const result = await dbcon.query(sql, [id]);
        const grupo = result.rows[0];
        return grupo;
    }

    static async exibirParticipa(user) {
        const sql = `SELECT * FROM public."grupoParticipantes"
            JOIN public.grupo on public."grupoParticipantes".grupo = public.grupo.id
            WHERE
                public."grupoParticipantes".user = $1`;
        const result = await dbcon.query(sql, [user]);
        const grupos = result.rows;
        return grupos;
    }

    static async atualiza(grupo) {
        const sql = `UPDATE public.grupo
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