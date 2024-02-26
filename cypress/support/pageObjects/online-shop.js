class onlineShop {

    selectors = {
        iniciaSesion: ()=> cy.get('[data-cy="registertoggle"]'),
        userField: ()=> cy.get('[data-cy="user"]'),
        passwordField: ()=> cy.get('[data-cy="pass"]'),
        submitForm: ()=> cy.get('[data-cy="submitForm"]'),
        onlineShop: ()=> cy.get('[data-cy="onlineshoplink"]'),
        addProduct: ()=> cy.get('[data-cy="add-product"]'),
        productNameField: ()=> cy.get('[data-cy="productName"]'),
        productPriceField: ()=> cy.get('[data-cy="productPrice"]'),
        productImageUrlField: ()=> cy.get('[data-cy="productCard"]'),
        idField: ()=> cy.get('[data-cy="productID"]'),
        createProduct: ()=> cy.get('[data-cy="createProduct"]'),
        searchField: ()=> cy.get('[data-cy="search-bar"]'),
        deleteProduct: ()=> cy.get('[`data-cy="delete-${productId}`]')

    }  
    
    iniciarSesion() {
        this.selectors.iniciaSesion().dblclick();
    }

    completeUserName(userName) {
        this.selectors.userField().type(userName);
    }

    completePassword(password) {
        this.selectors.passwordField().type(password);
    }

    submitForm() {
        this.selectors.submitForm().click();
    }

    clickOnlineShop() {
        this.selectors.onlineShop().click();
    }

    clickAddProduct() {
        this.selectors.addProduct().click();
    }

    typeProductNameField(productName) {
        this.selectors.productNameField().type(productName);
    }

    typeProductPriceField(productPrice) {
        this.selectors.productPriceField().type(productPrice);
    }

    typeProductImageUrlField(productImage) {
        this.selectors.productImageUrlField().type(productImage);
    }

    typeIdField(productId) {
        this.selectors.idField().type(productId);
    }

    clickCreateProduct(){
        this.selectors.createProduct().click();
    }

    typeSearch (productName) {
        this.selectors.searchField().type(`${productName}{enter}`);
    }

    clickOnDeleteProduct () {
        this.selectors.deleteProduct();
    }


}

export const onlineShopPage = new onlineShop();