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

        //Cypress.env('token', response.body.token) -- ambas formas sirven
        Cypress.env().token = response.body.token 
        cy.log(Cypress.env().token)
    });
    
});

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
    }).as("response");
});

Cypress.Commands.add('deleteProductById', function () {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env().apiUrl}/api/product/${this.response.body.products.docs[0]._id}`,
        headers: { Authorization: `Bearer ${Cypress.env().token}` },
    });
});

Cypress.Commands.add('createProduct', function(){   //parametrizar
    cy.request({
        method: 'POST',
        url: `${Cypress.env().apiUrl}/api/create-product`,
        headers: { Authorization: `Bearer ${Cypress.env().token}` },
        body: {
            name: "media", price: 1, img: "2", id: 987
        }
    });
})

// Cypress.Commands.add('createProduct', (productName, productPrice, productCard, productID) => {
//     cy.getByDataCy("add-product").click();
//     cy.getByDataCy("productName").type(productName);
//     cy.getByDataCy("productPrice").type(productPrice);
//     cy.getByDataCy("productCard").type(productCard);
//     cy.getByDataCy("productID").type(productID);
//     cy.getByDataCy("createProduct").click();
// });

Cypress.Commands.add('clickOnlineShop', () => {
    cy.getByDataCy("onlineshoplink").click();
});

Cypress.Commands.add("getByDataCy", (dataCy) => {
    cy.get(`[data-cy=${dataCy}]`)
});





