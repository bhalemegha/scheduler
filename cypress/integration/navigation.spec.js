/* eslint-disable no-undef */
describe("Navigation", () => {
  it("should visit root", () => {
    // eslint-disable-next-line no-undef
    cy.visit("/");
  });  

  it("should Click to Tuesday", () => {
    // eslint-disable-next-line no-undef
    cy.visit("/");
    cy.get("li").contains("Tuesday").as("dayItem");
    cy.get("@dayItem").click()
  });

  it("should change background color once Tuesday has been clicked", () => {
    // eslint-disable-next-line no-undef
    cy.visit("/");
    cy.contains("li", "Tuesday").click()
    .should("have.css", "background-color", "rgb(242, 242, 242)")
  });
  
  it("should change background color once Tuesday has been clicked", () => {
    // eslint-disable-next-line no-undef
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday").click()
    .should("have.class", "day-list__item--selected")
  });
});