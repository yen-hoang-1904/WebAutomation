// Load dependecies
"use strict";
const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');
const url = 'https://marksandspicy.com/';
const caps = {
    browserName: 'chrome',
    screen_resolution: '1366x768',
    // For superior debugging capabilities, CrossBrowserTesting offers the ability to record a video of the Selenium test session
    record_video: 'true',
    // To record the network packets during test for performance debugging, set the following to “true”.
    record_network: 'true'
};
const key = require('selenium-webdriver').Key;

describe('Test Case 1', () => {
    let driver;
    try {
        before(async () => {
            driver = new Builder().withCapabilities(caps)
                .build();
        });
        it('should go to login page at markandspciy.com, enter the username as test@test.com and password as ThisIs@T3st. "Authentication failed." should appear.', async () => {
            // Go to URL
            await driver.get(url);
            // Click on Login button
            await driver.findElement(By.className('login')).click();
            // Wait until the login page is fully loaded and the field Email adress is locatable. Timeout after 20s.
            await driver.wait(until.elementLocated(By.id('email')), 20000);
            await driver.findElement(By.id('email')).sendKeys('test@test.com');
            await driver.findElement(By.id('passwd')).sendKeys('ThisIs@T3st');
            // Check error message
            await driver.findElement(By.id('SubmitLogin')).sendKeys(Key.RETURN).then(async () => {
                const errorPromise = await driver.findElement(By.css("div[class='alert alert-danger'] ol li:nth-of-type(1)"));
                errorPromise.getText().then(async (value) => {
                    await expect(value).to.equal("Authentication failed.");
                }).catch((err) => {
                    console.log(err);
                });
            });
            // Take screenshot of errors during test run for easy debugging and documentation
            await driver.takeScreenshot().then((image, err) => {
                require('fs').writeFile('screenshots/case1.png', image, 'base64', (err) => {
                    if (err !== null) {
                        console.log(err);
                    }
                });
            });
        });
        after(async () => driver.quit());
    } catch (err) {
        handleFailure(err, driver)
    }
});

describe('Test Case 2', () => {
    let driver;
    try {
        before(async () => {
            driver = new Builder().withCapabilities(caps)
                .build();
        });
        it('should go to login page at markandspciy.com, enter the username as test. Validation tooltip should appear.', async () => {
            await driver.get(url);
            await driver.findElement(By.className('login')).click();
            // Wait until the login page is fully loaded and the field Email adress is locatable. Timeout after 20s.
            await driver.wait(until.elementLocated(By.id('email')), 20000);
            await driver.findElement(By.id('email')).sendKeys('test');
            await driver.findElement(By.id('SubmitLogin')).sendKeys(Key.RETURN).then(async () => {
                // Tooltip message is thrown by attribute "validationMessage" of HTML5
                const email =  await driver.findElement(By.id('email'));
                const validationMessage = email.getAttribute("validationMessage");
                validationMessage.then(async (value) => {
                    await expect(value).to.equal("Please include an '@' in the email address. 'test' is missing an '@'.");
                }).catch((err) => {
                    console.log(err);
                });

            });

            // Take screenshot of errors during test run for easy debugging and documentation
            await driver.takeScreenshot().then((image, err) => {
                require('fs').writeFile('screenshots/case2.png', image, 'base64', (err) => {
                    if (err !== null) {
                        console.log(err);
                    }
                });
            });
        });
        after(async () => driver.quit());
    } catch (err) {
        handleFailure(err, driver)
    }
});

describe('Test Case 3', () => {
    let driver;
    try {
        before(async () => {
            driver = new Builder().withCapabilities(caps)
                .build();
        });
        it('should go to login page at markandspciy.com, leave user name and password blank. Validation should appear in the input box.', async () => {
            await driver.get(url);
            await driver.findElement(By.className('login')).click();
            // Wait until the login page is fully loaded and the field Email adress is locatable. Timeout after 20s.
            await driver.wait(until.elementLocated(By.id('email')), 20000);
            await driver.findElement(By.id('email')).sendKeys(key.TAB);
            await driver.wait(until.elementLocated(By.id('passwd')), 20000);
            await driver.findElement(By.id('passwd')).sendKeys(key.TAB);
            const emailInput = await driver.findElement(By.id('email'));
            const emailParent = emailInput.findElement(By.xpath("./.."));
            await emailParent.getAttribute('class').then(async (value) => {
                await expect(value).to.include('form-error');
            }).catch((err) => {
                console.log(err); 
            });
            const passwordInput = await driver.findElement(By.id('email'));
            const passwordParent = passwordInput.findElement(By.xpath("./.."));
            await passwordParent.getAttribute('class').then(async (value) => {
                await expect(value).to.include('form-error');
            }).catch((err) => {
                console.log(err); 
            });
            // Take screenshot of errors during test run for easy debugging and documentation
            await driver.takeScreenshot().then((image, err) => {
                require('fs').writeFile('screenshots/case3.png', image, 'base64', (err) => {
                    if (err !== null) {
                        console.log(err);
                    }
                });
            });
        });
        after(async () => driver.quit());
    } catch (err) {
        handleFailure(err, driver)
    }
});


describe('Test Case 4', () => {
    let driver;
    try {
        before(async () => {
            driver = new Builder().withCapabilities(caps)
                .build();
        });
        it('should go to registration page at markandspciy.com, fill the info then check if the city populated when postal code is entered and check if the registration is successful', async () => {
            await driver.get(url);
            await driver.findElement(By.className('login')).click();
            // Wait until the login page is fully loaded and the field Email adress is locatable. Timeout after 20s.
            await driver.wait(until.elementLocated(By.id('email_create')), 20000);
            await driver.findElement(By.id('email_create')).sendKeys('yen.hoang.1904@gmail.com');
            await driver.findElement(By.id('SubmitCreate')).sendKeys(key.RETURN);
            // Wait until the login page is fully loaded and the field Email adress is locatable. Timeout after 20s.
            await driver.wait(until.elementLocated(By.className('form-subtitle')), 20000);
            await driver.findElement(By.id('email')).sendKeys('yen.hoang.1904@gmail.com');
            await driver.findElement(By.id('password')).sendKeys('abc123@');
            await driver.findElement(By.id('password2')).sendKeys('abc123@');
            await driver.findElement(By.css("label[for='CivMme']")).then((value) => {
                return value.click();
            });
            await driver.findElement(By.id('nom')).sendKeys('Hoang');
            await driver.findElement(By.id('prenom')).sendKeys('Yen');
            await driver.findElement(By.id('dateJour')).sendKeys('10');
            await driver.findElement(By.id('dateMois')).sendKeys('08');
            await driver.findElement(By.id('dateAnnee')).sendKeys('1987');
            await driver.findElement(By.id('adresse')).sendKeys('60 Boulevard Raymond Point Caree');
            await driver.findElement(By.id('codePostal')).sendKeys('92160');
            const ville = await driver.findElement(By.id('ville'));
            ville.getText().then(async (value) => {
                await expect(value).to.equal("Antony");            
            }).catch((err) => {
                console.log(err)
            });
            await driver.findElement(By.id('telephonePortable')).sendKeys('0612345678');
            await driver.findElement(By.id('telephoneFixe')).sendKeys('0612345678');
            await driver.findElement(By.id('BtnCreationSubmit')).sendKeys(key.RETURN);
            // Take screenshot of errors during test run for easy debugging and documentation
            await driver.takeScreenshot().then((image, err) => {
                require('fs').writeFile('screenshots/case4.png', image, 'base64', (err) => {
                    if (err !== null) {
                        console.log(err);
                    }
                });
            });
        });
        after(async () => driver.quit());
    } catch (err) {
        handleFailure(err, driver)
    }
});


function handleFailure(err, driver) {
    console.error('Something went wrong!\n', err.stack, '\n');
    driver.quit();
} 
