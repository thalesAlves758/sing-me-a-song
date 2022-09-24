/* eslint-disable no-undef */
import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { recommendationService } from "../../../src/services/recommendationsService";
import { getMockRecommendation } from "../../utils/recommendations.utils";

describe("getByIdOrFail", () => {
  it("should throw not found error", async () => {
    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);
    const fakeId = Number(faker.random.numeric());

    const expectedError = { type: "not_found", message: "" };

    const promise = recommendationService.getById(fakeId);

    await expect(promise).rejects.toEqual(expectedError);
  });

  it("should return recommendation", async () => {
    const recommedation = getMockRecommendation();

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(recommedation);

    const promise = recommendationService.getById(recommedation.id);

    await expect(promise).resolves.toEqual(recommedation);
  });
});
