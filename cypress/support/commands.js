// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const { command } = require("commander");


Cypress.Commands.add("login", (username, password) => {
      cy.request({
        method: "POST",
        url: `${Cypress.env().apiUrl}/api/login`,
        body: {
            username: username,
            password: password,
        },
    }).then((response) => {
        window.localStorage.setItem("token", response.body.token);
        window.localStorage.setItem("username", response.body.user.username);
        window.localStorage.setItem("password", response.body.user.password);

        //Cypress.env('token', response.body.token) -- ambas formas sirven
        Cypress.env().token = response.body.token 
        cy.log(Cypress.env().token)
    });
    
});

Cypress.Commands.add("getByDataCy", (dataCy) => {
    cy.log("hola");
})

