describe('Dependent tests bad practice', () => {
  beforeEach(() => {
    cy.visit('http://notes-serverless-app.com/login')

    cy.get('#email').type(Cypress.env('user_email'))
    cy.get('#password').type(Cypress.env('user_password'), { log: false })
    cy.get('button[type="submit"]').click()
    
    cy.contains('h1', 'Your Notes').should('be.visible')
  })

  it('CRUDS a note', () => {
    //Create a note
    cy.contains('Create a new note').click()

    cy.get('#content').type('My note')
    cy.contains('Create').click()

    //Assert the note was created
    cy.get('.list-group')
      .should('contain', 'My note')
      .click()

    //Update the note
    cy.get('#content').type(' updated')
    cy.contains('Save').click()

    //Assert the note was updated
    cy.get('.list-group').should('contain', 'My note updated')
    cy.get('.list-group:contains(My note updated)')
      .should('be.visible')
      .click()

    //Delete the note
    cy.contains('Delete').click()

    //Assert the note was deleted
    cy.get('.list-group:contains(My note updated)').should('not.exist')
  })
})
