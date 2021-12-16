/* eslint-disable no-undef */


describe("should book an interview", () => {
 
  it("If DOM is ready, It shows  Monday", () => {
    // eslint-disable-next-line no-undef
    cy.visit("/");
    cy.contains("Monday");
  }); 

  it("should cancel an interview", () => {
    cy.get('.appointment').first().trigger('mouseover');
    cy.get('[alt=Edit]').first().invoke('show').click();
    cy.get("[interviewid=2]").first().click();
    cy.get(".button--danger").click();
    cy.get("[data-testid=student-name-input]").should("to.be", "Archie Cohen");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  beforeEach(() => {
    cy.request("http://localhost:8001/api/debug/reset")
  }) 

  it("Saves new appointment successfully", () => {
    cy.get("[alt=Add]").as("addBtn")
      .first()
      .click();
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").first().click();
    cy.get(".button--confirm").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("Edit an appointment successfully", () => {
    cy.get('.appointment').first().trigger('mouseover');
    cy.get('[alt=Edit]').first().invoke('show').click();
    cy.get("[interviewid=2]").first().click();
    cy.get(".button--confirm").click();
    cy.contains(".appointment__card--show", "Archie Cohen");
    cy.contains("Tori Malcolm");
  });

  it("Delete an appointment successfully", () => {
    cy.get('.appointment').first().trigger('mouseover');
    cy.get('[alt=Delete]').first().invoke('show').click();
    cy.contains("Confirm").click();
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });

})