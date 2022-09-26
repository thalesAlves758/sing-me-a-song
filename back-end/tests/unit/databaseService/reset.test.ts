/* eslint-disable no-undef */
import { jest } from "@jest/globals";
import * as databaseRepository from "../../../src/repositories/databaseRepository";
import { resetDatabase } from "../../../src/services/databaseService";

describe("reset", () => {
  it("should call reset repository function", async () => {
    jest
      .spyOn(databaseRepository, "reset")
      .mockImplementationOnce((): any => {});

    await resetDatabase();

    expect(databaseRepository.reset).toBeCalled();
  });
});
