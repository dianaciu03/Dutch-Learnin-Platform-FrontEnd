describe('Terms and Conditions Page', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/')
  })

  it('should navigate to Terms and Conditions through Register page', () => {
    // Click on the Register button
    cy.contains('Register', { timeout: 50000 }).click()

    // Verify we are on the Register page
    cy.url().should('include', '/register', { timeout: 50000 })

    // Click on the Terms and Conditions link
    cy.contains('Terms and Conditions', { timeout: 50000 }).click()

    // Verify we are on the Terms and Conditions page
    cy.url().should('include', '/terms', { timeout: 50000 })

    // Verify the page title
    cy.get('h1').should('contain', 'SlimStudie Terms and Conditions', { timeout: 50000 })
  })
}) 