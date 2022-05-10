const pegaArquivo = require('../index');

const arrayResult = [
    {
        FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
    }
];

describe('pegaArquivo::', () => {
    it('Deve ser uma função', () => {
        expect(typeof pegaArquivo).toBe('function');
    });
    it('Deve retornar array com resultados', async () => {
        const resultado = await pegaArquivo('./test/arquivos/texto1.md');
        expect(resultado).toEqual(arrayResult);
    });
    it('Deve retornar mensagem "não há links"', async () => {
        const resultado = await pegaArquivo('./test/arquivos/texto1_sem_links.md');
        expect(resultado).toBe('Não há links');
    });
});