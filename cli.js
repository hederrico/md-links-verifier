const chalk = require('chalk');
const pegaArquivo = require("./index");
const validaURLs = require("./http-validacao");

const caminho = process.argv;

async function processaTexto(caminhoDoArquivo) {
    const resultado = await pegaArquivo(caminhoDoArquivo);
    if (caminho[3] === 'validar') {
        console.log(chalk.yellow('Links Validados'), await validaURLs(resultado))
    } else {
        console.log(chalk.yellow('Lista de Links'), resultado);
    }
}

processaTexto(caminho[2]);
