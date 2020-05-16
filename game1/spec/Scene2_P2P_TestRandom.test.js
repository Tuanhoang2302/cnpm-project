/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import expectPuppeteer from 'expect-puppeteer';

// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('regenerator-runtime');
const puppeteer = require('puppeteer');

let page;

describe('check question 1', () => {
  describe('check existance of text', () => {
    test('test 1', async () => {
      const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size=3000, 3000'],
      });
      page = await browser.newPage();
      await page.goto('http://localhost:8080/');

      await expect(page).toMatch('There are');
      await expect(page).toMatch('blocks');
    }, 10000);

    test('test 2', async () => {
      await expect(page).toMatch('Ther are');
      await expect(page).toMatch('blocks');
    }, 1000);
  }, 10000);

  describe('check existance of input', () => {
    test('test 1', async () => {
    // await expect(page).toMatch('blocks');
      await expect(page).toMatchElement('input#input1');
      await expect(page).toMatchElement('input#input2');
    }, 1000);

    test('test 2', async () => {
      // await expect(page).toMatch('blocks');
      await expect(page).toMatchElement('input#inpute');
      await expect(page).toMatchElement('input#inputr');
    }, 1000);
  }, 2000);

  describe('display suggest', () => {
    test('test 1', async () => {
      await page.click('input#input1');
      await page.type('input#input1', '2');
      await page.waitForSelector('#thought1', {
        visible: true,
      }, 500);
    }, 3000);

    test('test 2', async () => {
      await page.type('input#input1', '1');
      await page.waitForSelector('#thought1', {
        visible: true,
      }, 500);
    }, 3000);
  }, 10000);


  test('display value of 10 in result', async () => {
    await page.type('input#input1', '1');
    await page.click('input#input2');
    await page.type('input#input2', '0');
  }, 2000);
}, 20000);

// -------------------------------------------------------

describe('check question 2', () => {
  describe('check existance of text', () => {
    test('test 1', async () => {
      await expect(page).toMatch('There are');
      await expect(page).toMatch('blocks');
    }, 1000);

    test('test 2', async () => {
      await expect(page).toMatch('Ther are');
      await expect(page).toMatch('blocks');
    }, 1000);
  }, 2000);

  describe('check existance of input', () => {
    test('test 1', async () => {
      // await expect(page).toMatch('blocks');
      await expect(page).toMatchElement('input#input3');
      await expect(page).toMatchElement('input#input4');
    }, 1000);

    test('test 2', async () => {
      // await expect(page).toMatch('blocks');
      await expect(page).toMatchElement('input#inpute');
      await expect(page).toMatchElement('input#inputr');
    }, 1000);
  }, 2000);

  describe('display suggest', () => {
    test('test 1', async () => {
      await page.click('input#input3');
      await page.type('input#input3', '2');
      await page.waitForSelector('#thought2', {
        visible: true,
      }, 500);
    }, 3000);

    test('test 2', async () => {
      await page.type('input#input3', '1');
      await page.waitForSelector('#thought2', {
        visible: true,
      }, 500);
    }, 3000);
  }, 10000);


  test('display value of 10 in result', async () => {
    await page.type('input#input3', '1');
    await page.click('input#input4');
    await page.type('input#input4', '0');
  }, 2000);
}, 20000);

// ---------------------------------------------------

describe('check question 3', () => {
  describe('check existance of text', () => {
    test('test 1', async () => {
      await expect(page).toMatch('There are');
      await expect(page).toMatch('blocks');
    }, 1000);

    test('test 2', async () => {
      await expect(page).toMatch('Ther are');
      await expect(page).toMatch('blocks');
    }, 1000);
  }, 2000);

  describe('check existance of input', () => {
    test('test 1', async () => {
      // await expect(page).toMatch('blocks');
      await expect(page).toMatchElement('input#input5');
      await expect(page).toMatchElement('input#input6');
    }, 1000);

    test('test 2', async () => {
      // await expect(page).toMatch('blocks');
      await expect(page).toMatchElement('input#inpute');
      await expect(page).toMatchElement('input#inputr');
    }, 1000);
  }, 2000);

  describe('display suggest', () => {
    test('test 1', async () => {
      await page.click('input#input5');
      await page.type('input#input5', '2');
      await page.waitForSelector('#thought3', {
        visible: true,
      }, 500);
    }, 3000);

    test('test 2', async () => {
      await page.type('input#input5', '1');
      await page.waitForSelector('#thought3', {
        visible: true,
      }, 500);
    }, 3000);
  }, 10000);


  test('display value of 10 in result', async () => {
    await page.type('input#input5', '1');
    await page.click('input#input6');
    await page.type('input#input6', '0');
  }, 2000);
}, 20000);

describe('show last question', () => {
  test('test 1', async () => {
    await page.waitForSelector('#panelresult1', {
      visible: true,
    });
    await page.waitForSelector('#panelresult2', {
      visible: true,
    });
    await page.waitForSelector('#panelresult3', {
      visible: true,
    });
  }, 1000);

  test('test 2', async () => {
    await page.click('#button');
    await page.waitForSelector('#panelresult1', {
      visible: true,
    });
    await page.waitForSelector('#panelresult2', {
      visible: true,
    });
    await page.waitForSelector('#panelresult3', {
      visible: true,
    });
  }, 3000);
}, 10000);
