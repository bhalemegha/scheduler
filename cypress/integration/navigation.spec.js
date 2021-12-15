/* eslint-disable no-undef */
describe("Navigation", () => {
  it("should visit root", () => {
    // eslint-disable-next-line no-undef
    cy.visit("/");
  });  
  
  it("should navigate to Tuesday", () => {
    // eslint-disable-next-line no-undef
    cy.visit("/");
    cy.contains("Tuesday").should("to.be","Tuesday")
  });

  it("should Click to Tuesday", () => {
    // eslint-disable-next-line no-undef
    cy.visit("/");
    cy.contains("Tuesday").as("dayItem");
    cy.get("@dayItem").click()
  });
});