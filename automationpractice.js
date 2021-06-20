const puppeteer = require('puppeteer');
const expect = require("chai").expect;

const faker = require("faker");
faker.local = "en_GB";

let email, firstName, lastName, password, company, address, city, state, zipcode, homePhone, mobileNumber;

const puppeteerOptions = {
        headless: false,
        slowMo: 20,
        args: [
            '--start-fullscreen'
        ]
    };

    (async () => {
        const browser = await puppeteer.launch(puppeteerOptions);
        const page = await browser.newPage();
        await page.setViewport({width: 1366, height: 768});
        await page.goto('http://automationpractice.com/index.php');
        await page.click(".login");
        console.log("User clicks on Login option from home page");
        await page.waitForSelector("#email_create", {
            visible: true
        });
        console.log("Create an account page option has been displayed")
        // Enter Email address
        email = faker.internet.email();
        await page.type("#email_create", email);
        await page.click("button[id='SubmitCreate'] span");
        console.log("User enter email");
        await page.waitForSelector("#customer_firstname", {
            visible: true
        });
        //Select title
        await page.click("#id_gender1");
        // firstname
        firstName = faker.name.firstName();
        await page.type("#customer_firstname", firstName)
        // lastname
        lastName = faker.name.lastName();
        await page.type("#customer_lastname", lastName);
        // Email
        const element = await page.$("#email");
        const hasEmail = await (await element.getProperty('innerText')).jsonValue();
        // let hasEmail = await page.$eval('#email', (el) => el.textContent);
        // let hasEmail = await page.evaluate(el=>el.value,"#email");
        expect(hasEmail, "Email input prePopulated with email address").eql(email);
        // password
        await page.type("#passwd", "Test@12345");
        // await browser.close();
    })();
