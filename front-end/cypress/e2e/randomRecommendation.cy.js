describe("random recommendation", () => {
  it("should navigate to http://localhost:3000/random", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-cy="to-random"]').click();

    cy.url().should("eq", "http://localhost:3000/random");
  });
});
