//Interceptar la llamada que agrega una area al test y el response
// Completar la tarea. Validar el status response de la llamada que edita la tarea 

/// <reference types = "cypress" />

const directorioName = __dirname.replaceAll("\\", "/");
const module = directorioName.split(/[/]/)[3];
const scenarioName = directorioName.split(/[/]/).slice(2,3).join("-");
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${module} - ${scenarioName}`, () => {


    it(`${scenarioName} - intercept`, () => {
        cy.log(testCaseId)
        cy.log(directorioName)
        cy.visit('https://pushing-it.vercel.app/')
        cy.get('#registertoggle').dblclick()
        cy.get('#user').type('pushingit')
        cy.get('#pass').type('123456!')
        cy.get('#submitForm').click()
        cy.get('[data-cy="todolistlink"]').click()
        cy.get('[data-cy="removeAll"]').should('be.visible').click()
        
        cy.intercept('POST', 'api/save-task', (req) => {
            req.body.completed = true

        }).as('createResponse')
        cy.get('[data-cy="task"]').type("Tarea {enter}")
        cy.wait('@createResponse').then(response => {
            expect(response.response.body.task.completed).to.be.true;
        })

        //interceptar el post que agrega la tarea
        cy.contains('p', 'Tarea', { timeout: 10000 }).should('be.visible').click()
        cy.contains('p', 'Tarea', { timeout: 10000 }).should('attr', 'style', 'text-decoration: line-through;')
        //interceptar el put/patch que edita la tarea
    });

});