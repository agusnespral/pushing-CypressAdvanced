/// <reference types = "cypress" />

import { onlineShopPage } from "../../../support/pageObjects/online-shop"

const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[3]
const scenarioName = directorioName.split(/[/]/).slice(2, 3).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {
    it(`${module}`, () => {
        cy.visit("/");

        cy.fixture("online-shop/desafio-1/fixture").then((data) => {   //fixture hardcodeado
            onlineShopPage.iniciarSesion();
            onlineShopPage.completeUserName(data.userName);
            onlineShopPage.completePassword(data.password);
            onlineShopPage.submitForm();
            onlineShopPage.clickOnlineShop();
            onlineShopPage.clickAddProduct();
            onlineShopPage.typeProductNameField(data.productName);
            onlineShopPage.typeProductPriceField(data.productPrice);
            onlineShopPage.typeProductImageUrlField(data.productImage);
            onlineShopPage.typeIdField(data.productId);
            onlineShopPage.clickCreateProduct();
            onlineShopPage.typeSearch(data.productName);
            onlineShopPage.clickOnDeleteProduct();

        });




        // cy.log(directorioName)
        // cy.log('Verificar que exista, si existe eliminarlo');
        // cy.log(`Crear un producto numero ${testCaseId}`)
    });
});