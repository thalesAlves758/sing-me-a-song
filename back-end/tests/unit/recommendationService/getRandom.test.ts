/* eslint-disable no-undef */
import { jest } from "@jest/globals";
import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { recommendationService } from "../../../src/services/recommendationsService";
import { getMockRecommendation } from "../../utils/recommendations.utils";

describe("getRandom", () => {
  it("should throw not found error", async () => {
    jest.spyOn(Math, "random").mockReturnValueOnce(0.6);

    jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);

    const expectedError = { type: "not_found", message: "" };

    const promise = recommendationService.getRandom();

    await expect(promise).rejects.toEqual(expectedError);
  });

  it("should return a recommendation", async () => {
    const recommendation = getMockRecommendation();

    jest.spyOn(Math, "random").mockReturnValueOnce(0.7);
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValueOnce([recommendation]);
    jest.spyOn(Math, "floor").mockReturnValueOnce(0);

    const result = await recommendationService.getRandom();

    expect(result).toEqual(recommendation);
  });
});
