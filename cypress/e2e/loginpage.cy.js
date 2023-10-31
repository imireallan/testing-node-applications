describe("The login process", () => {
  it("Should login user, flash message and redirect to homepage", () => {
    cy.intercept({
        method: 'POST',
        url: '/api/v1/auth/login',
      }, { fixture: 'user.json' })

    cy.visit("/auth/login")
    cy.get("input[name='email']").type('test@user4.com')
    cy.get("input[name='password']").type('pass@word1')

    cy.get('button').click()

    cy.get('#email-confirm').should('contain', 'Please confirm your email address.')
    cy.get('#auth-username').should('contain', 'Hey, Test User4')
    cy.get('#auth-logout').should('contain', 'Logout')

  });
});
 