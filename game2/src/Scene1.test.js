const expectPuppeteer = require('expect-puppeteer');

const regeneratorRuntime = require('regenerator-runtime');
const puppeteer = require('puppeteer');
let page;
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
   
        await expect(page).toMatch('How many apples are in the box:');
     },10000)
     
},10000)
describe('check existance of input', ()=>{
    test('test1', async()=>{
        await expect(page).toMatchElement('input#number1');
        await expect(page).toMatchElement('input#number2');
    },10000)
    
},10000)
describe('display suggest',()=>{
    test('test1', async()=>{
        await page.click('input#number1');
        await page.type('input#number1','2');
        await page.waitForSelector('#Countaplle',{
            visible: true,
        },500);
        await expect(page).toMatch('Count the apples');
    },3000)
    test('test2', async()=>{
        await page.type('input#number1','3');
        await page.waitForSelector('#Countaplle',{
            visible: true,
        },500);
    },3000)
    test('display value of 10 apples in the box', async()=>{
        await page.type('input#number1','1');
        await page.click('input#number2');
        await page.type('input#number2','0');
    },3000)
},10000)
},20000)

//-------------------------//
describe('check question 2', ()=>{
 test('check existance of text', async()=>{
    await expect(page).toMatch('Total number of boxes: ');
 },10000);
 test('check existance of input', async()=>{
    await expect(page).toMatchElement('input#number3');
 },10000)
 test('test2', async()=>{
    await page.type('input#number3','5');
    await page.waitForSelector('#border',{
        visible: true,
    },500);
},3000)
 test('value 1 box',async()=>{
    await page.click('input#number3');
    await page.type('input#number3', '1');
 },3000)
},20000)
