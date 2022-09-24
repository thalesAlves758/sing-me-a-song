/* eslint-disable no-undef */
import { jest } from "@jest/globals";
import { recommendationService } from "../../../src/services/recommendationsService";
import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { getMockRecommendation } from "../../utils/recommendations.utils";

describe("insert", () => {
  it("should throw conflict error", async () => {
    const recommendationMock = getMockRecommendation();

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce(recommendationMock);

    const expectedError = {
      type: "conflict",
      message: "Recommendations names must be unique",
    };

    await expect(() =>
      recommendationService.insert({
        name: recommendationMock.name,
        youtubeLink: recommendationMock.youtubeLink,
      })
    ).rejects.toEqual(expectedError);
  });

  it("should call create function", async () => {
    const { name, youtubeLink } = getMockRecommendation();

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce(null);

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementation((): any => {});

    await recommendationService.insert({ name, youtubeLink });

    expect(recommendationRepository.create).toBeCalled();
  });
});
