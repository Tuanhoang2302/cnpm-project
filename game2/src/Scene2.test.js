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
        await expect(page).toMatch('How many apples are in one box:');
        await expect(page).toMatch('How many apples are there?');
     },10000)
     
},10000)
describe('check existance of input', ()=>{
    test('test1', async()=>{
        await expect(page).toMatchElement('input#nu1');
        await expect(page).toMatchElement('input#nu2');
    },10000)
    
},10000)
describe('display suggest',()=>{
    test('test1', async()=>{
        await page.click('input#nu1');
        await page.type('input#nu1','2');
        await page.waitForSelector('#change',{
            visible: true,
        },1000);
    },3000)
   
    test('display value of 10 apples in the box', async()=>{
        await page.type('input#nu1','1');
        await page.click('input#nu2');
        await page.type('input#nu2','0');
    },3000)
},10000)
},20000)

//-------------------------//
describe('check question 2', ()=>{
 test('check existance of text', async()=>{
    await expect(page).toMatch('Total number of boxes: ');
 },10000);
 test('check existance of input', async()=>{
    await expect(page).toMatchElement('input#nu3');
 },10000)
 test('test2', async()=>{
    await page.type('input#nu3','5');
    
},3000)
 test('value 1 box',async()=>{
    await page.type('input#nu3','8');
 },3000)
},20000)

// --------------------//
describe('check question 3', ()=>{

    describe('check existance of text', ()=>{
        test('test1', async()=>{
            await expect(page).toMatch('How many apples are there:');
         },10000)
         
    },10000)
    describe('check existance of input', ()=>{
        test('test1', async()=>{
            await expect(page).toMatchElement('input#nu4');
            await expect(page).toMatchElement('input#nu5');
        },10000)
        
    },10000)
    describe('display suggest',()=>{
        test('test1', async()=>{
            await page.click('input#nu4');
            await page.type('input#nu4','4');
           
        },3000)
        test('display value of 10 apples in the box', async()=>{
            await page.type('input#nu4','8');
        await page.click('input#nu5');
        await page.type('input#nu5','1');
        await page.waitForSelector('#hint',{
            visible: true,
        },1000);
        await expect(page).toMatch('Write 0');
        //await expect(page).toMatch('Write 0');
        await page.type('input#nu5','0');

        },3000)
    },10000)
    },20000)