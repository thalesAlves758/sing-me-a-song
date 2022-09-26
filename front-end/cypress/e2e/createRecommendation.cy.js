import { faker } from "@faker-js/faker";

describe("create recommendation", () => {
  it("should create a new recommendation", () => {
    cy.resetDatabase();

    const recommendationFake = {
      name: faker.music.songName(),
      youtubeLink: "https://youtu.be/UNdQsRCFJjA",
    };

    cy.intercept("POST", "/recommendations").as("postRecommendation");

    cy.visit("http://localhost:3000/");

    cy.get('[data-cy="name"]').type(recommendationFake.name);
    cy.get('[data-cy="youtubeLink"]').type(recommendationFake.youtubeLink);

    cy.get('[data-cy="create-recommendation"]').click();

    cy.wait("@postRecommendation");

    cy.contains(recommendationFake.name).should("be.visible");
  });
});
