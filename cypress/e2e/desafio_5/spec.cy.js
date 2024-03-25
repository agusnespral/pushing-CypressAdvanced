const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {
    before(() => {
        cy.login('pushingit', '123456!');
        cy.visit(Cypress.env().baseUrl);
        cy.get('[data-cy="onlineshoplink"]').click();
        cy.get('[aria-label="Add to cart"]').should('be.visible')
    });

    it('Deberia permitir al usuario validar productos', function () {
        // this.data.productos.producto1.totalPrice = this.data.productos.producto1.quantity * this.data.productos.producto1.price

        // cy.get('[id="add-to-cart-1000"]').click()
        // cy.getByDataCy('closeModal').click()

        cy.get('[id="add-to-cart-1000"]').click()
        cy.getByDataCy('closeModal').click()
        cy.getByDataCy('goShoppingCart').click()
        cy.getByDataCy('goBillingSummary').click()
        cy.getByDataCy('goCheckout').click()
        cy.getByDataCy('firstName').type('nombre')
        cy.getByDataCy('lastName').type('apellido')
        cy.getByDataCy('cardNumber').type('1234512345123451')
        cy.getByDataCy('purchase').click()
        cy.getByDataCy('thankYou').should('be.visible')
        //Crear un custom command para verificar nombre y apellido, producto y cantidad, tarjeta y precio total
        //

        cy.validatePurchase(
            {
                'name': 'nombre apellido',
                'Buzo negro': '1 x Buzo Negro',
                'creditCard': '1234512345123451',
                'totalPrice': '23.76'
            }
            ) 


    });
});