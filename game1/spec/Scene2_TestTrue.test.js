/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import expectPuppeteer from 'expect-puppeteer';

// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('regenerator-runtime');
const puppeteer = require('puppeteer');

let page;


describe('check question 1', () => {
  test('check existance of text', async () => {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 80,
      args: [
        '--window-size=1920,1080',
      ],
    });
    page = await browser.newPage();

    await page.goto('http://localhost:8080/');

    // await expect(page).toMatch('There are');
    const ques = await page.$eval('#ques1', (el) => el.textContent);
    expect(ques).toBe('There are ');
    const wordEndQues = await page.$eval('#word_end_ques1', (el) => el.textContent);
    expect(wordEndQues).toBe(' blocks');
  }, 12000);

  test('check existance of input', async () => {
    // await expect(page).toMatch('blocks');
    await expect(page).toMatchElement('input#input1');
    await expect(page).toMatchElement('input#input2');
  }, 10000);

  test('display suggest', async () => {
    await page.click('input#input1');
    await page.type('input#input1', '2');
    await page.waitForSelector('#thought1', {
      visible: true,
    }, 1000);
  }, 10000);

  test('display value of 10 in result', async () => {
    await page.type('input#input1', '1');
    await page.click('input#input2');
    await page.type('input#input2', '0');
  }, 2000);
}, 10000);


describe('check question 2', () => {
  test('check existance of text', async () => {
    const ques = await page.$eval('#ques2', (el) => el.textContent);
    expect(ques).toBe('There are ');
    const wordEndQues = await page.$eval('#word_end_ques2', (el) => el.textContent);
    expect(wordEndQues).toBe(' blocks');
  }, 10000);

  test('check existance of input', async () => {
    // await expect(page).toMatch('blocks');
    await expect(page).toMatchElement('input#input3');
    await expect(page).toMatchElement('input#input4');
  }, 10000);

  test('display suggest', async () => {
    await page.click('input#input3');
    await page.type('input#input3', '2');
    await page.waitForSelector('#thought2', {
      visible: true,
    }, 500);
  }, 10000);

  test('display value of 10 in result', async () => {
    await page.type('input#input3', '1');
    await page.click('input#input4');
    await page.type('input#input4', '0');
  }, 10000);
}, 10000);


describe('check question 3', () => {
  test('check existance of text', async () => {
    const ques = await page.$eval('#ques3', (el) => el.textContent);
    expect(ques).toBe('There are ');
    const wordEndQues = await page.$eval('#word_end_ques3', (el) => el.textContent);
    expect(wordEndQues).toBe(' blocks');
  }, 10000);

  test('check existance of input', async () => {
    // await expect(page).toMatch('blocks');
    await expect(page).toMatchElement('input#input5');
    await expect(page).toMatchElement('input#input6');
  }, 10000);

  test('display suggest', async () => {
    await page.click('input#input5');
    await page.type('input#input5', '2');
    await page.waitForSelector('#thought3', {
      visible: true,
    }, 500);
  }, 10000);

  test('display value of 10 in result', async () => {
    await page.type('input#input5', '1');
    await page.click('input#input6');
    await page.type('input#input6', '0');
  }, 10000);
}, 10000);


describe('show last question', () => {
  test('click button', async () => {
    await page.click('#button');
  }, 1000);

  test('show panelresult', async () => {
    await page.waitForSelector('#panelresult1', {
      visible: true,
    });
    await page.waitForSelector('#panelresult2', {
      visible: true,
    });
    await page.waitForSelector('#panelresult3', {
      visible: true,
    });
  }, 10000);
}, 10000);
