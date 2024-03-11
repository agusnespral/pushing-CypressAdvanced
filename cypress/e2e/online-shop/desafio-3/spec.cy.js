/// <reference types = "cypress" />


const directorioName = __dirname.replaceAll("\\", "/");
const module = directorioName.split(/[/]/)[3];
const scenarioName = directorioName.split(/[/]/).slice(2, 3).join("-");
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${module} - ${scenarioName}`, () => {

    before('login', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env().apiUrl}/api/login`,
            headers: { 'Accept-Language': 'en-us', },
            body: {
                "password": `${Cypress.env().password}`,
                "username": `${Cypress.env().username}`
            }
        }).then(response => {
            window.localStorage.setItem("user", response.body.user.username);
            window.localStorage.setItem("password", response.body.user.password);
            window.localStorage.setItem("token", response.body.token);

            Cypress.env('token', response.body.token);
        })

    })
    it(`${scenarioName} - API: Verificar, crear y eliminar 2 productos - FE: comprar productos`, () => {
        cy.fixture('online-shop/desafio-3/fixture').then(data => {


            cy.getAndDeleteProductById(data.productId1);
            cy.getAndDeleteProductById(data.productId2);
            cy.createProduct(data.productName1, data.productPrice1, data.productImg1, data.productId1);
            cy.createProduct(data.productName2, data.productPrice2, data.productImg2, data.productId2)

            cy.visit(`${Cypress.env().baseUrl}/`)
            cy.get('[id="onlineshoplink"]').click();

            cy.addProductToCartById(data.productId1, 2);
            cy.addProductToCartById(data.productId2, 4);
            cy.intercept('POST', 'api/purchase').as('productBought')
            cy.buyProductfromPLP(data.firstName, data.lastName, data.cardNumber);
            cy.wait('@productBought').then((purchase) => {

                const query = `SELECT * FROM PUBLIC."purchaseProducts" INNER JOIN (SELECT * FROM PUBLIC.SELLS WHERE PUBLIC.SELLS."firstName" = 'Agus' AND PUBLIC.SELLS."lastName" = 'Nes' ORDER BY PUBLIC.SELLS.id DESC LIMIT 1) AS LastSell ON PUBLIC."purchaseProducts".SELL_ID = LastSell.ID;`
                cy.task("connectDB", query).then(response => {
                    //valido el request de la compra interceptado con los datos de la bd
                    expect(response[0].cardNumber).to.equal(purchase.request.body.cardNumber);
                    expect(response[0].firstName).to.equal(purchase.request.body.firstName);
                    expect(response[0].lastName).to.equal(purchase.request.body.lastName);
                })
            })
        })

    })

});
