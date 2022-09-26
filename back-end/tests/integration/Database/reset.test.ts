/* eslint-disable no-undef */
import request from "supertest";
import app from "../../../src/app";
import { prisma } from "../../../src/database";
import { insertManyRecommendations } from "../../utils/recommendations.utils";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`,
  ]);
});

describe("reset", () => {
  it("should return 200 status code and a message", async () => {
    const expectedStatus = 200;
    const expectedMessage = "database reseted";
    const expectedLengthInDb = 0;

    await insertManyRecommendations(10);

    const result = await request(app).post("/database/reset").send();

    expect(result.status).toEqual(expectedStatus);
    expect(result.text).toEqual(expectedMessage);

    const data = await prisma.recommendation.findMany();

    expect(data).toHaveLength(expectedLengthInDb);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
