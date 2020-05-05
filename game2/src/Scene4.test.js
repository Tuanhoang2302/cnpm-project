const expectPuppeteer = require('expect-puppeteer');

const regeneratorRuntime = require('regenerator-runtime');
const puppeteer = require('puppeteer');
let page;


// This is well explained in the API

describe('check question 1', ()=>{

describe('check existance of text', ()=>{
    
     
    test('test1', async()=>{
        const browser =await puppeteer.launch({
            headless: false,
            slowMo:80,
            args:['--window-size=3000, 3000'],
            
        });
        page = await browser.newPage();
        await page.goto(
         `http://127.0.0.1:5500/index.html`
            );
        await expect(page).toMatch('How many apples are there:');
     },10000)
     
},10000)
describe('check existance of input', ()=>{
    test('test1', async()=>{
        await expect(page).toMatchElement('input#nu29');
        await expect(page).toMatchElement('input#nu10');
    },10000)
    
},10000)
describe('display suggest',()=>{
    test('test1', async()=>{
        await page.click('input#nu29');
        await page.type('input#nu29','5');
        await page.waitForSelector('#chidan',{
            visible: true,
        },1000);
        await expect(page).toMatch('How many boxes are there?');
        await page.type('input#nu29','7');
    },3000)
   
    test('test2', async()=>{
        await page.click('input#nu10');
        await page.type('input#nu10','1');
        await page.waitForSelector('#viet0',{
            visible: true,
        },1000);
        await expect(page).toMatch('Write 0');
        await page.type('input#nu10','0');
        
    },3000)
},10000)
},20000)

//-------------------------//
