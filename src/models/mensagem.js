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

    // static async atualiza(user) {
    //     const sql = `UPDATE mensagem
    //         SET nome = $2, 
    //             email = $3,
    //             senha = $4,
    //             imagem = $5
    //         WHERE id = $1;`;
    //     const values = [user.id, user.nome, user.email, user.senha, user.imagem];
        
    //     try {
    //         await dbcon.query(sql, values);
    //         return true;
    //     } catch (error) {
    //         console.log({ error });
    //         return false;
    //     }
    // }

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