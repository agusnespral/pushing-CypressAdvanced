/// <reference types = "cypress" />

const directorioName = __dirname.replaceAll("\\", "/");
const module = directorioName.split(/[/]/)[3];
const scenarioName = directorioName.split(/[/]/).slice(2, 3).join("-");
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {
    beforeEach("PreCondition", () => {
        cy.fixture("online-shop/desafio-2/fixture").then((data) => {
            cy.login(data.username, data.password);
            cy.visit(Cypress.env().baseUrl);
        });
    });
    it(`${module} - API/FE`, () => {
        cy.fixture("online-shop/desafio-2/fixture").then((data) => {
            //API
            cy.getProductByName(data.productEditName);

            cy.get("@response").then(function () {
                const amountObjects = this.response.body.products.docs.length;
                if (amountObjects > 0) {
                    cy.deleteProductById();
                }
            });

            cy.clickOnlineShop();
            cy.createProduct(
                data.productName,
                data.productPrice,
                data.productCard,
                data.productId * Math.floor(Math.random() * 10000)
            );
            cy.getProductById(data.productId);
            cy.editProduct(
                data.productEditName,
                data.productEditPrice,
                data.productEditCard
            );

            //Front End
            cy.searchProductById().should("be.visible");
            cy.wait(2000);
            
            //Aserttions
            cy.get("@responseEditProduct").then((response) => {
                cy.getByDataCy('price')
                    .invoke("text")
                    .then((price) => {
                        cy.log(price);
                        const priceInt = parseInt(price);
                        expect(priceInt).to.be.equal(response.body.product.price);
                    });
                    cy.getByDataCy('name')
                    .invoke("text")
                    .then((name) => {
                        expect(name).to.be.equal(response.body.product.name);
                    });
            });
        });
    });
});
