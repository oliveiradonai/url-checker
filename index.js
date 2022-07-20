const puppeteer = require('puppeteer');
const prompt = require('prompt-sync')({ sigint: true });
const fsPromises = require('fs').promises

// Função que roda o robô
async function robo(urlToCheck) {
    // Configurações gerais do robô
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

    const date = new Date();

    try {
        // Abrindo a página
        const response = await page.goto(urlToCheck);
        await browser.close();

        // Salvado log das consultas
        await fsPromises.appendFile('log.txt', `URL: ${urlToCheck} | response: ${response.status()} | Data: ${formatDate(date)} \n`);

        return response.status();
    } catch (error) {
        await browser.close();

        // Salvado log das consultas caso haja exceção
        await fsPromises.appendFile('log.txt', `URL: ${urlToCheck} | Ocorreu um erro ao verificar a URL | Data: ${formatDate(date)} \n`);

        return 'Ocorreu um erro ao verificar a URL';
    }
};

// Função para solicitar URL ao usuário
async function handleInputUrl() {
    const urlUser = prompt('Informe a URL a ser verificada: ');
    const response = await robo(urlUser);
    console.log(response);
}

// Função para formatar datas
function formatDate(dateIn){
    const dateOut = dateIn.getDate() + '/' + (dateIn.getMonth() + 1) + '/' + dateIn.getFullYear() + ' ' + dateIn.getHours() + ':' + dateIn.getMinutes() + ':' + dateIn.getSeconds();

    return dateOut;
}

handleInputUrl();