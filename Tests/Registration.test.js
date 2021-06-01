const puppeteer = require('puppeteer');
const expect = require("chai").expect;
const faker = require("faker");
faker.local = "en_GB";

const HomePage = require('../Pages/HomePage');
const AuthenticationPage = require("../Pages/AuthenticationPage");
const CreateAnAccountPage = require("../Pages/CreateAnAccountPage");

const homePage = new HomePage();
const authenticationPage = new AuthenticationPage();
const createAnAccountPage = new CreateAnAccountPage();

let email, firstName, lastName, password, company, address, city, state, zipcode, homePhone, mobileNumber;

describe('Customer should be able tp register', function () {

    let browser;
    let page;

    // before hook
    before(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
        page = await browser.newPage()
        // await page.setViewport({width: 1366, height: 768});
        await page.goto('http://automationpractice.com/index.php');
    });

    it('should be able to register as new customer', async () => {
        firstName = faker.name.firstName();
        lastName = faker.name.lastName();
        password = "Test@12345";

        homePage.getPageTitle(page).then(result => {
            expect(result).eql("My Store");
        });
        await homePage.ClickOnSignInOption(page);
        // Enter Email address
        email = faker.internet.email();
        await authenticationPage.EnterEmail(page, email);
        await authenticationPage.ClickCreateAnAccount(page);
        // Registration page
        await createAnAccountPage.HasCreateAccountDisplayed(page);
        await createAnAccountPage.EnterPersonalInformation(page, "Mr", firstName, lastName, password);
    });

    // after hook
    after(async () => {
        await browser.close()
    });
});
