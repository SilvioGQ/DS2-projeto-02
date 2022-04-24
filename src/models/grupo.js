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

    static async exibirParticipa(user) {
        const sql = `SELECT public.grupo.id as grupoId, * FROM public."grupoParticipantes"
            JOIN public.grupo on public.grupo.id = public."grupoParticipantes".grupo
        WHERE 
            public."grupoParticipantes".user = $1`;
        const result = await dbcon.query(sql, [user]);
        const grupos = result.rows;
        return grupos;
    }

    static async detalhar(id) {
        const sql = 'SELECT * FROM public.grupo WHERE id = $1';
        const result = await dbcon.query(sql, [id]);
        const grupo = result.rows[0];
        return grupo;
    }

    static async buscaPeloId(id) {
        const sql = 'SELECT * FROM public.grupo where id = $1';
        const result = await dbcon.query(sql, [id]);
        const grupo = result.rows[0];
        return grupo;
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

    static async cadastrar(nome, admin, imagem) {
        const sql = 'INSERT INTO public.grupo (nome, admin, imagem) VALUES ($1, $2, $3) returning *';
        const values = [nome, admin, imagem];
        
        try {
            const response = await dbcon.query(sql, values);
            return response;
        } catch (error) {
            console.log('NAO FOI POSSIVEL INSERIR');
            console.log({ error });
            return false;
        }
    }
    static async deleta(grupo) {
        const sql = `delete from public."grupo" where id = $1`;
        const values = [grupo];

        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('NAO FOI POSSIVEL EXCLUIR');
            console.log({ error });
            return false;
        }
    }
}

module.exports = {
    Grupo,
    GrupoDAO
};