/* eslint-disable no-undef */
describe("should book an interview", () => {
  beforeEach(() => {
    cy.request("http://localhost:8001/api/debug/reset")
  })

  it("If DOM is ready, It shows  Monday", () => {
    // eslint-disable-next-line no-undef
    cy.visit("/");
    cy.contains("Monday");
  });

  it("Click to new icon and displays a form", () => {
    // cy.request("GET", "http://localhost:8001/api/debug/reset")
    // eslint-disable-next-line no-undef
    cy.get("[alt=Add]")
      .first()
      .click();
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").first().click();
    cy.get(".button--confirm").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
})