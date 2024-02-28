//refactorizar el codigo para tomar el value del input #user despues de haber escrito el usuario invoke('val')
// Asignar el valor a un alias using as

/// <reference types = "cypress" />

const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[3]
const scenarioName = directorioName.split(/[/]/).slice(2, 3).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module}`, () => {
    it(`${module}`, () => {
        cy.visit('https://pushing-it.vercel.app/')
        cy.get('#registertoggle').dblclick()
        cy.get('#user').type('pushingit')
        cy.get('#user').invoke('val').as("user")
        cy.get('#pass').type('123456!')
        cy.get('#submitForm').click()
        cy.get('[id^="user_pushingit"]').invoke('text').then(function name(text) {
            expect(text).to.include(this.user) //remplazar puhsingit por el alias utilizando this. 
        }  // refactorizar esto para que utilice una function en vez del callback
            
        );
    });
});

