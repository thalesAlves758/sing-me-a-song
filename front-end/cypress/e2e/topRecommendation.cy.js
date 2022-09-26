describe("top recommendation", () => {
  it("should navigate to /top route", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-cy="to-top"]').click();

    cy.url().should("eq", "http://localhost:3000/top");
  });
});
