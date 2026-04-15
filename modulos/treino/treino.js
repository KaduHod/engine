import e from "express";
import { EntidadesGym } from "../../entidades.js";
import pool from "../../database/conn.js";
const treino_router = e.Router();
/** @type {import('express').RequestHandler} */
const index = async (req, res) => {
    const entidade = EntidadesGym.exercicio_treino;
    // Dados de exemplo para a lista (pode ser array vazio inicialmente)
    const [ itens ] = await pool.promise().query(`SELECT * FROM treino_exercise`)
    console.log(itens)
    res.render('motor/form', {
        entidade,
        itens,
        entidades: EntidadesGym
    });

}

treino_router.get("/", index);
export default treino_router;
