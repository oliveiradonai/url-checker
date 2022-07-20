const puppeteer = require('puppeteer');
const fs = require('fs');

async function robo() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    const urlToCheck = 'http://httpstat.us/500';
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    
    try {
        const response = await page.goto(urlToCheck);
        console.log(response.status());
        await browser.close();
        
    } catch (error) {
        console.log('Ocorreu um erro ao acessar a URL informada!');
    }
};

robo();