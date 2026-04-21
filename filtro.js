import { ITENS_POR_PAGINA } from "./config.js";
/**
 * @typedef {Object} FiltroSqlEntidade
 * @property {string} sql
* @property {Array<any>} argumentos
 */
/**
* Gera uma cláusula SQL WHERE baseada na entidade e parâmetros de consulta.
*
* @param {import('./entidades.js').Entidade} entidade - Entidade contendo definições de tabela e colunas.
* @param {import('express').Request['query']} query - Objeto de parâmetros de consulta do Express (req.query).
* @param {Record<string, string>} conf_aliases - config de aliases para tabelas em joins
* @returns {FiltroSqlEntidade} String contendo a cláusula WHERE ou string vazia se não houver filtros.
*/
export function gerar_filtro_sql_entidade(entidade, query, conf_aliases = {}) {
    let argumentos = []
    let where = []
    const colunas = entidade.colunas.filter(c => c.filtro).map(c => c.nome);
    for (const [coluna, valor] of Object.entries(query)) {
        if(valor && colunas.includes(coluna)) {
            let coluna_entidade = entidade.colunas.find(c => c.nome == coluna)
            argumentos.push(valor)
            let tabela_alias = "";
            let coluna_filtro = coluna_entidade.nome;
            if(coluna_entidade.fk) {
                tabela_alias = conf_aliases[coluna_entidade.fk]+".";
                coluna_filtro = 'id';
            } else {
                tabela_alias = conf_aliases[entidade.tabela]+".";
            }
            where.push(`${tabela_alias}${coluna_filtro} = ?`)
        }
    }
    let sql = where.join(" and ");
    return {sql, argumentos};
}

/**
* Gera offset para paginacao
*
* @param {string} query
* @param {number} pagina
* @returns {string} query formatada para paginacao
*/
export function montar_paginacao(query, pagina = 1) {
    return query + ` ORDER BY t.id ASC LIMIT ${ITENS_POR_PAGINA} OFFSET ${(pagina-1) * ITENS_POR_PAGINA}`
}
/**
* Gera query para ppegar total de itens do banco
*
* @param {string} query
* @returns {string} query formatada para pegar total
*/
export function montar_query_total(query) {
    return query.replace(/SELECT[\s\S]*?FROM/i, 'SELECT COUNT(*) as total FROM')
}
