const puppeteer = require('puppeteer');
const required = require('@small-tech/required')

class CreateAnAccountPage {

    async HasCreateAccountDisplayed(page){
        await page.waitForSelector("#customer_firstname", {
            visible: true
        });
        console.log("Create An Account page has been displayed");
    }

    async EnterPersonalInformation(page= required('page'),
                                   title = required('title'),
                                   firstName = required("firstName"),
                                   lastName = required("lastName"),
                                   password = required("password")) {


        //Select title
        if (title === "Mr") {
            await page.click("#id_gender1");
        } else {
            await page.click("#id_gender2");
        }
        // firstname
        await page.type("#customer_firstname", firstName)
        // lastname
        await page.type("#customer_lastname", lastName);
        // password
        await page.type("#passwd", password);
    }

    async EnterYourAddress() {

    }

    async ClickOnRegister() {

    }


}
module.exports=CreateAnAccountPage;
