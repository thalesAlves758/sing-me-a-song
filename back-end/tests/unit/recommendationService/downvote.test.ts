/* eslint-disable no-undef */
import { jest } from "@jest/globals";
import { recommendationService } from "../../../src/services/recommendationsService";
import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { getMockRecommendation } from "../../utils/recommendations.utils";
import { faker } from "@faker-js/faker";

describe("downvote", () => {
  it("should throw not found error", async () => {
    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    const fakeId = Number(faker.random.numeric());

    const expectedError = { type: "not_found", message: "" };

    const promise = recommendationService.downvote(fakeId);

    await expect(promise).rejects.toEqual(expectedError);
  });

  it("should call updateScore function", async () => {
    const recommendation = getMockRecommendation();

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(recommendation);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce({ ...recommendation, score: -1 });

    await recommendationService.downvote(recommendation.id);

    expect(recommendationRepository.updateScore).toBeCalled();
  });

  it("should call updateScore and remove functions", async () => {
    const recommendation = getMockRecommendation();

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(recommendation);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce({ ...recommendation, score: -6 });

    jest
      .spyOn(recommendationRepository, "remove")
      .mockImplementationOnce((): any => {});

    await recommendationService.downvote(recommendation.id);

    expect(recommendationRepository.updateScore).toBeCalled();
    expect(recommendationRepository.remove).toBeCalled();
  });
});
