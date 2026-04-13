// @ts-check
/**
 * @typedef {"string" | "number" | "boolean"} TipoColuna
 * @typedef {"unico" | "lista" } TipoEntidade
 * @typedef {"treino" | "exercise" | "pessoa" | "exercicio_treino"} TiposEntidadesGym
 */
/**
 * @typedef {Object} Coluna
 * @property {string} nome
 * @property {TipoColuna} tipo
 * @property {boolean} [pk=false]
 * @property {boolean} [hidden=false]
 * @property {boolean|string} [fk=false]
 */

/**
 * @typedef {Object} Entidade
 * @property {string} nome
 * @property {string} http_path_name
 * @property {string} tabela
 * @property {TipoEntidade} tipo
 * @property {Coluna[]} colunas
 */

/** @type {Entidade} */
const exercicio_treino = {
    nome: "Exercicio Treino",
    http_path_name: "exercicio_treino",
    tabela: "treino_exercise",
    tipo: "lista",
    colunas: [
        {
            nome: "treino",
            tipo: "number",
            hidden: true,
            pk: true,
            fk: false,
        },
        {
            nome: "exercicio",
            tipo: "number",
            fk: "exercise"
        },
        {
            nome: "series",
            tipo: "number",
        },
        {
            nome: "repetições",
            tipo: "number",
        },
        {
            nome: "descanso",
            tipo: "number",
        }
    ]
}

/** @type {Entidade} */
const pessoa = {
    nome: "Pessoa",
    tabela: "pessoa",
    http_path_name: "pessoa",
    tipo: "lista",
    colunas: [
        {
            nome:"nome",
            tipo:"string",
        }
    ]
}

/**
    @type {Partial<Record<TiposEntidadesGym, Entidade>>}
*/
export const EntidadesGym = {
    exercicio_treino, pessoa
}
