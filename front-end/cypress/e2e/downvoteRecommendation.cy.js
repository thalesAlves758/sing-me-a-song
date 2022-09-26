import { faker } from "@faker-js/faker";

describe("downvote recommendation", () => {
  it("should be able to downvote recommendation", () => {
    cy.resetDatabase();

    const recommendationFake = {
      name: faker.music.songName(),
      youtubeLink: "https://youtu.be/UNdQsRCFJjA",
    };

    cy.intercept("POST", "/recommendations/*/downvote").as(
      "downvoteRecommendation"
    );

    cy.request(
      "POST",
      "http://localhost:5000/recommendations",
      recommendationFake
    );

    cy.visit("http://localhost:3000/");

    cy.contains(recommendationFake.name).get('[data-cy="arrow-down"]').click();

    cy.wait("@downvoteRecommendation");

    cy.get('[data-cy="arrow-down"]')
      .parent()
      .contains(/^-1$/)
      .should("be.visible");
  });
});
