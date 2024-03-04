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
            cy.searchProductById().should("be.visible")
                        
            //Aserttions
            //la pag luego de hacer la busqueda muestra por 2 segundos todos los productos y luego muestra solo
            //el que buscaste, por lo cual si solo lo buscas por datacy=name te selecciona el incorrecto
            //haciendo intercept + wait pasa lo mismo. 
            //para evitar el wait use el contains y me movi con el siblings a price 
            cy.get("@responseEditProduct").then((response) => {
                cy.getByDataCy('name').contains(`${data.productEditName}`).siblings('#price')
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
