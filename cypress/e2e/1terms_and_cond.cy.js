describe('Terms and Conditions Page', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/')
  })

  it('should navigate to Terms and Conditions through Register page', () => {
    // Click on the Register button
    cy.contains('Register').click()

    // Verify we are on the Register page
    cy.url().should('include', '/register')

    // Click on the Terms and Conditions link
    cy.contains('Terms and Conditions').click()

    // Verify we are on the Terms and Conditions page
    cy.url().should('include', '/terms')

    // Verify the page title
    cy.get('h1').should('contain', 'SlimStudie Terms and Conditions')
  })
}) 