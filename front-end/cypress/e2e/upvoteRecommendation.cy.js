import { faker } from "@faker-js/faker";

describe("upvote recommendation", () => {
  it("should be able to upvote recommendation", () => {
    cy.resetDatabase();

    const recommendationFake = {
      name: faker.music.songName(),
      youtubeLink: "https://youtu.be/UNdQsRCFJjA",
    };

    cy.intercept("POST", "/recommendations/*/upvote").as(
      "upvoteRecommendation"
    );

    cy.request(
      "POST",
      "http://localhost:5000/recommendations",
      recommendationFake
    );

    cy.visit("http://localhost:3000/");

    cy.contains(recommendationFake.name).get('[data-cy="arrow-up"]').click();

    cy.wait("@upvoteRecommendation");

    cy.get('[data-cy="arrow-up"]')
      .parent()
      .contains(/^1$/)
      .should("be.visible");
  });
});
