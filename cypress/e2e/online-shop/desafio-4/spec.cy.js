const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${module} `, () => {
    before(() => {
        cy.login('pushingit', '123456!');
        // cy.visit(Cypress.env().baseUrl);
        // cy.get('[data-cy="onlineshoplink"]').click();
        // cy.get('[aria-label="Add to cart"]').should('be.visible')
    });

    it(`${scenarioName} - API: Verificar, crear y eliminar 2 productos - FE: comprar productos`, () => {
        cy.fixture('online-shop/desafio-4/fixture').then(data => {


            cy.getAndDeleteProductById(data.productId1);
            cy.getAndDeleteProductById(data.productId2);
            cy.createProduct(data.productName1, data.productPrice1, data.productImg1, data.productId1);
            cy.createProduct(data.productName2, data.productPrice2, data.productImg2, data.productId2)

            cy.visit(`${Cypress.env().baseUrl}/`)
            cy.get('[id="onlineshoplink"]').click();

            cy.addProductToCartById(data.productId1, data.quantity1);
            cy.addProductToCartById(data.productId2, data.quantity2);
            cy.verifyTotalPrice()

            let totalPrice1 = data.quantity1 * data.productPrice1;
            let totalPrice2 = data.quantity2 * data.productPrice2;
            let totalFinalPrice = totalPrice1 +  totalPrice2
            let totalFinalPriceFloat = parseFloat(totalFinalPrice).toFixed(2)
            cy.get('@totalPrice').then((totalPrice) =>{
                expect(totalPrice).to.equal(totalFinalPriceFloat)
            })
            
            
            cy.validateCart({                
                'quantity': data.quantity1,
                'productName1': data.productName1,
                'price': data.productPrice1,
                'totalPrice': totalPrice1
            }, 0);

            
            cy.validateCart({                
                'quantity': data.quantity2,
                'productName1': data.productName2,
                'price': data.productPrice2,
                'totalPrice': totalPrice2
            }, 1)

            cy.verifyBillingSummary({
                'subtotalAmount': totalFinalPrice,
                'freightAmount': 'Free',
                'totalPriceAmount': totalFinalPrice
            })
             
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


