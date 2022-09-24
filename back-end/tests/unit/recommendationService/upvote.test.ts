/* eslint-disable no-undef */
import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { recommendationService } from "../../../src/services/recommendationsService";
import { getMockRecommendation } from "../../utils/recommendations.utils";

describe("upvote", () => {
  it("should throw not found error", async () => {
    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);
    const fakeId = Number(faker.random.numeric());

    const expectedError = { type: "not_found", message: "" };

    const promise = recommendationService.upvote(fakeId);

    await expect(promise).rejects.toEqual(expectedError);
  });

  it("should call update recommendation score function", async () => {
    const recommendation = getMockRecommendation();

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(recommendation);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {});

    await recommendationService.upvote(recommendation.id);

    expect(recommendationRepository.updateScore).toBeCalled();
  });
});
