/* eslint-disable no-undef */
import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import { recommendationRepository } from "../../../src/repositories/recommendationRepository";
import { recommendationService } from "../../../src/services/recommendationsService";

describe("getTop", () => {
  it("should call getAmountByScore function", async () => {
    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockResolvedValueOnce([]);

    const fakeAmount = Number(faker.random.numeric());

    const expectedValue = [];

    const result = await recommendationService.getTop(fakeAmount);

    expect(recommendationRepository.getAmountByScore).toBeCalled();
    expect(result).toEqual(expectedValue);
  });
});
