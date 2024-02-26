class onlineShop {

    selectors = {
        iniciaSesion: ()=> cy.get('[data-cy="registertoggle"]'),
        userField: ()=> cy.get('[data-cy="user"]'),
        passwordField: ()=> cy.get('[data-cy="pass"]'),
        submitForm: ()=> cy.get('[data-cy="submitForm"]'),
        title:()=> cy.get('[class="chakra-heading css-y5314g"]'),
        onlineShop: ()=> cy.get('[data-cy="onlineshoplink"]'),
        addProduct: ()=> cy.get('[data-cy="add-product"]'),
        productNameField: ()=> cy.get('[data-cy="productName"]'),
        productPriceField: ()=> cy.get('[data-cy="productPrice"]'),
        productImageUrlField: ()=> cy.get('[data-cy="productCard"]'),
        idField: ()=> cy.get('[data-cy="productID"]'),
        createProduct: ()=> cy.get('[data-cy="createProduct"]'),
        closeCreatePopup: ()=> cy.get('[data-cy="closeModal"]'),
        searchType: ()=> cy.get('[data-cy="search-type"]'),
        productName: ()=> cy.get('[data-cy="name"]'),
        searchField: ()=> cy.get('[data-cy="search-bar"]'),
        trashIcon: Id => cy.get(`[data-cy="delete-${Id}"]`),
        deleteProductConfirm: ()=> cy.get('#saveEdit'),
        closeButtonDeleteConfirm: ()=> cy.get('[data-cy="closeModal"]'),
        productListPage: ()=> cy.get('[class^="chakra-form-control"]'),
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

    clickOnCloseCreatePopup() {
        this.selectors.closeCreatePopup().click();
    }

    clickSearchType(val) {
        this.selectors.searchType().select(val)
    }

    typeSearch(productId) {
        this.selectors.searchField().type(`${productId}{enter}`);
    }

    clickOnTrashIcon(Id) {
        this.selectors.trashIcon(Id).click();
    }

    clickOnConfirmDelete() {
        this.selectors.deleteProductConfirm().click();
    }

    clickOnCloseDeletePopup() {
        this.selectors.closeButtonDeleteConfirm().click();
    }

    searchEnter() {
        this.selectors.searchField().type('{enter}');
    }

     


}

export const onlineShopPage = new onlineShop();