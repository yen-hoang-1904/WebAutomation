WEB AUTOMATION 

The aime of the project is to build a web automation framework that will validate the front end application developed in-house. For demonstration purpose, the tests are designed to test Chrome browser only. 
For future improvement, to speed our automated testing, we can run tests in parallel, making use of several browsers or devices at one time with the help of services like BrowserStack, which provide numerous machines to test against, comes in handy. 
Running automated Browser tests on BrowserStack is not free. See available plans at https://www.browserstack.com/pricing.

Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Prerequisites
What things you need to install the software and how to install them:
_ Node version manager: nvm 0.35.0.
_ NodeJs: 12.12.0 (latest).
_ Chrome: 77.0.

Installing in Mac/Linux
Run commands below:
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
    nvm install v12.12

Running the tests - How to run the automated tests for this system
_ Download all dependencies with npm:
      npm install
_ Run test with mocha:
      npm test
Each test is concluded with a screenshot for facilicating debugging and investigation. All screenshots are saved in screenshots folder. 

Built With
Selenium (javascript) - The test framework used.
Mocha - JavaScript Test Framework. 
Chai - BDD/TDD assertion library.
Eslint - Javascript linter.
Nodejs - Dependency Management.

Versioning
I use Gitbucket for versioning. For the versions available, see the tags on this repository.

Authors
Yen HOANG

License
This project is licensed under the ISC License - see the LICENSE.md file for details

