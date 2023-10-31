describe("The home page", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("Should display page title", () => {
    cy.get('#home-page-title').should("contain", "FULLSTACK-JS MERN STARTER");
  });
  it("Should have sign in and login button", () => {
    cy.get('#login-button').should('contain', 'Sign In')
    cy.get('#register-button').should('contain', 'Join Now')
  });
  it("Should navigate to sign in page", () => {
    cy.get('#login-button').click()
    cy.url().should('contain', 'auth/login')
  });
  it("Should navigate to register page", () => {
    cy.get('#register-button').click()
    cy.url().should('contain', 'auth/register')
  });
});
