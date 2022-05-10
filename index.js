const chalk = require('chalk');
const fs = require('fs');

const filepath = './arquivos/texto1.md';

function extraiLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResultados = [];
    let temp;
    while ((temp = regex.exec(texto)) !== null) {
        //Para usar "temp[1] como chave, devemos englobá-lo em colchetes"
        arrayResultados.push({[temp[1]]: temp[2]});
    }

    return arrayResultados.length === 0 ? 'Não há links' : arrayResultados;
}

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Não há arquivo no caminho'));
}

//Escrita síncrona porém o JS trabalha como assíncrono
async function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';
    try {
        const text = await fs.promises.readFile(caminhoDoArquivo, encoding);
        return extraiLinks(text);
    } catch (error) {
        trataErro(error);
    }
}

//Método assíncrono
/*
function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';
    fs.promises
    .readFile(caminhoDoArquivo, encoding)
    .then((texto) => console.log(chalk.green(texto)))
    .catch((erro) => trataErro(erro));
}
*/

//Método Síncronomo
/*
function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';
    //Para ignorar um parâmetro em uma função basta utilizar o underline.
    fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
        if (erro) {
            trataErro(erro);
        }
        console.log(chalk.green(texto));
    })
}
*/

module.exports = pegaArquivo;