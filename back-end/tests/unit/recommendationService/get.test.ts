/* eslint-disable no-undef */
import { jest } from "@jest/globals";
import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { recommendationService } from "../../../src/services/recommendationsService";

describe("get", () => {
  it("should call findAll function", async () => {
    jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce([]);

    const expectedValue = [];

    const result = await recommendationService.get();

    expect(recommendationRepository.findAll).toBeCalled();
    expect(result).toEqual(expectedValue);
  });
});
