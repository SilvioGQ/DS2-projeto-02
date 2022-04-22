const { dbcon } = require("../config/connection-db");

class Mensagem {
    constructor(id, user, data, texto, grupo) {
        this.id = id;
        this.user = user;
        this.data = data;
        this.texto = texto;
        this.grupo = grupo;
    }
}

class MensagemDAO {
    static async buscaPeloId(id) {
        const sql = 'SELECT * FROM mensagem where id = $1';
        const result = await dbcon.query(sql, [id]);
        const user = result.rows[0];
        return user;
    }

    static async mensagensGrupo(grupo, page) {
        const sql = `SELECT * FROM public.mensagem
                JOIN public."user" on public.mensagem.user = public."user".id
            WHERE 
                grupo = $1
            ORDER BY DATA DESC
            LIMIT 10
            OFFSET $2`;
        const result = await dbcon.query(sql, [grupo, ((page*10)-10)]);
        const mensagens = result.rows;
        return mensagens;
    }

    static async enviarMensagem(mensagem) {
        const sql = 'INSERT INTO public.mensagem (user, texto, grupo) VALUES ($1, $2, $3);';
        const values = [mensagem.user, mensagem.texto, user.grupo];
        
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
    Mensagem,
    MensagemDAO
};