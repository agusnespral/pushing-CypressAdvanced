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
        Cypress.env().token = response.body.token
    });

});

Cypress.Commands.add("getAndDeleteProductById", (productId) => {
    cy.request({
        method: 'GET',
        url: `${Cypress.env().apiUrl}/api/products?id=${productId}`,
        headers: {
            'Authorization': `Bearer ${Cypress.env().token}`
        }
    }).its('body.products.docs').each(productResponse => {
        cy.request({
            method: 'DELETE',
            failOnStatusCode: false,
            url: `${Cypress.env().apiUrl}/api/product/${productResponse._id}`,
            headers: { 'Authorization': `Bearer ${Cypress.env().token}` },
        });
    });
})

Cypress.Commands.add('getProductByName', (name) => {
    cy.request({
        method: 'GET',
        url: `${Cypress.env().apiUrl}/api/products?name=${name}`,
        headers: { Authorization: `Bearer ${Cypress.env().token}` },
    }).as("response");
});

Cypress.Commands.add('getProductById', (id) => {
    cy.request({
        method: 'GET',
        url: `${Cypress.env().apiUrl}/api/products?id=${id}`,
        headers: { Authorization: `Bearer ${Cypress.env().token}` },
    }).as("responseId")
});

Cypress.Commands.add('deleteProductById', function () {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env().apiUrl}/api/product/${this.response.body.products.docs[0]._id}`,
        headers: { Authorization: `Bearer ${Cypress.env().token}` },
    });
});

Cypress.Commands.add('createProduct', function (name, price, img, id) {
    cy.request({
        method: 'POST',
        url: `${Cypress.env().apiUrl}/api/create-product`,
        headers: { Authorization: `Bearer ${Cypress.env().token}` },
        body: {
            name: name, price: price, img: img, id: id
        }
    }).as('responseCreateProduct')
})

Cypress.Commands.add('editProduct', function (name, price, img) {
    cy.request({
        method: 'PUT',
        url: `${Cypress.env().apiUrl}/api/product/${this.responseCreateProduct.body.product._id}`,
        headers: { Authorization: `Bearer ${Cypress.env().token}` },
        body: {
            name: name, price: price, img: img
        }
    }).as('responseEditProduct')
});

Cypress.Commands.add('clickOnlineShop', () => {
    cy.getByDataCy("onlineshoplink").click();
});

Cypress.Commands.add("getByDataCy", (dataCy) => {
    cy.get(`[data-cy=${dataCy}]`)
});

Cypress.Commands.add('searchProductById', function () {
    cy.get('@responseCreateProduct').then(response => {
        cy.getByDataCy('search-type').select(1)
        cy.getByDataCy('search-bar').type(`${response.body.product.id}{enter}`)
    });
});


Cypress.Commands.add("addProductToCartById", (productId, ammount) => {

    cy.contains("ID").parent().select(1);
    cy.get('#search-bar').clear().type(productId).type('{enter}');
    for (let i = 0; i < ammount; i++) {
        cy.get(`[data-cy="add-to-cart-${productId}"]`).click();
        cy.get('[data-cy="closeModal"]').click();
    }
});

Cypress.Commands.add('verifyTotalPrice', () => {
    cy.get('button').contains('Go to shopping cart').click();
    cy.get('button').contains('Show total price').click();
    cy.get('.css-1g7ucpo').within(() => {
        cy.get('#price').invoke('text').as('totalPrice')
    })
});

Cypress.Commands.add('buyProductfromPLP', (firstName, lastName, cardNumber) => {
    cy.get('[data-cy="goCheckout"]').click();
    cy.get('[data-cy="firstName"]').type(firstName);
    cy.get('[data-cy="lastName"]').type(lastName);
    cy.get('[data-cy="cardNumber"]').type(cardNumber);
    cy.get('[data-cy="purchase"]').click();
    cy.get('[data-cy="thankYou"]').click();
});

Cypress.Commands.add('validateCart', (product, line) => {
    cy.get('.css-5drwi8').within(() => {
        let index = 0;
        Cypress._.forEach(product, (key) => {
            cy.get('li').eq(line).within(() => {
                cy.get('p').eq(index).should('include.text', key)
                index++
            })
        })
    })
});

Cypress.Commands.add('validatePurchase', (product) => {
    cy.get('.css-ud2986').within(() => {
        let index = 0;
        Cypress._.forEach(product, (value) => {
            if (index == 3) {
                index++
            } else {
                cy.get('p').eq(index).should('include.text', value)
                index++
            }
        })
    })
})

Cypress.Commands.add('verifyBillingSummary', (summary) => {
    cy.get('[data-cy="goBillingSummary"]').click();
    let index = 0;
    Cypress._.forEach(summary, (key, atributo) => {
        cy.get('.css-5drwi8').eq(index).within(() => {
            cy.get(`[data-cy="${atributo}"]`).should('include.text', key)
        })
        index++;
    })
});