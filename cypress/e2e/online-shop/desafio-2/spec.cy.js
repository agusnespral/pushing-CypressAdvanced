/// <reference types = "cypress" />

const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[3]
const scenarioName = directorioName.split(/[/]/).slice(2, 3).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {

    beforeEach("prc", () => {

        cy.fixture('online-shop/desafio-2/fixture').then((data) => {
            cy.login(data.username, data.password);
            cy.visit(Cypress.env().baseUrl);
        })
    })

    it(`${module}`, () => {

        cy.fixture('online-shop/desafio-2/fixture').then((data) => {
            cy.request({
                method: 'GET',
                url: `${Cypress.env().apiUrl}/api/products?name=${data.productName}`,
                headers: { Authorization: `Bearer ${Cypress.env().token}` },
            }).as("response");
            

            cy.get('@response').then(function () {
                cy.log(this.response)
                cy.request({
                    method: 'DELETE',
                    url: `${Cypress.env().apiUrl}/api/product/${this.response.body.products.docs[0]._id}`,
                    headers: { Authorization: `Bearer ${Cypress.env().token}` },
                });
            })
            
        })


    })
})
