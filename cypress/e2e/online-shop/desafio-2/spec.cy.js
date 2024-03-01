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
            cy.getProductByName(data.productName)         
            

            cy.get('@response').then(function () {
                const amountObjects = this.response.body.products.docs.length;
                cy.log(`Hay ${amountObjects} productos para eliminar`);
                cy.log(this.response);

                if (amountObjects > 0) {
                    cy.deleteProductById();    
                }
                
            })

            cy.clickOnlineShop();
            cy.createProduct(data.productName, data.productPrice, data.productCard, data.productId);
            //cy.getProductById(data.productId);
            
        })


    })
})
