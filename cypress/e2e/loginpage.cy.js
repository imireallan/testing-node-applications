describe("The login process", () => {
  it("Should login user, flash message and redirect to homepage", () => {
    cy.login("test@user4.com", "pass@word1");

    cy.get("button").click();

    cy.get("#email-confirm").should(
      "contain",
      "Please confirm your email address."
    );
    cy.get("#auth-username").should("contain", "Hey, Test User4");
    cy.get("#auth-logout").should("contain", "Logout");
  });
});
