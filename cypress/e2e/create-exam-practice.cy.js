describe('Create Exam Practice', () => {
  beforeEach(() => {
    // Mock the authentication state
    cy.window().then((win) => {
      win.localStorage.setItem('isAuthenticated', 'true');
      win.localStorage.setItem('user', JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        role: 'teacher'
      }));
      win.localStorage.setItem('examPracticeLevel', 'B1 - Intermediate');
      win.localStorage.setItem('examPracticeMaxGrade', '100');
      win.localStorage.setItem('examPracticeName', 'Cypress test');
      win.localStorage.setItem('examPracticeReadingComponents', JSON.stringify([]));
    });
  });

  it('creates an exam from start to finish', () => {
    // Navigate to create exam page
    cy.visit('/create-exam');

    // Select Level: Beginner (change as needed)
    cy.contains('label', 'Level', { timeout: 10000 }) 
    .parent() 
    .find('[role="combobox"]') 
    .click(); 
  
    cy.get('ul[role="listbox"]') 
        .contains('li', 'B1 - Intermediate') 
        .click(); 

    // Input Maximum Grade: 100
    cy.contains('label', 'Maximum Grade')
    .parent()
    .find('input')
    .then($input => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      ).set;
      nativeInputValueSetter.call($input[0], '100'); 
      
      $input[0].dispatchEvent(new Event('change', { bubbles: true }));
    });

    // Input Exam Practice Name: Cypress test
    cy.contains('label', 'Exam Practice Name')
    .parent()
    .find('input')
    .then($input => {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
        ).set;
        nativeInputValueSetter.call($input[0], 'Cypress test');
        
        $input[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    
    // Click Save Exam Details button
    cy.contains('button', 'Save Exam Details')
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    cy.contains('button', '+ Reading section')
      .should('be.enabled');

    // Click + Reading section button
    cy.contains('button', '+ Reading section')
      .click();

    // // Click Post Exam
    // cy.contains('button', 'Post Exam Practice')
    // .click();

    // // Verify we're redirected to the home page
    // cy.url().should('eq', Cypress.config().baseUrl + '/');

    // // Verify the new exam practice appears in the list
    // cy.contains('Cypress test').should('be.visible');
  });

}); 
  