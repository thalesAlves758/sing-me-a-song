/* eslint-disable no-undef */
import request from "supertest";
import app from "../../../src/app";
import { prisma } from "../../../src/database";
import {
  insertManyRecommendations,
  insertRecommendation,
} from "../../utils/recommendations.utils";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`,
  ]);
});

describe("### GET /recommendations/top/:amount ###", () => {
  it("should return 200 status code and an empty array", async () => {
    const expectedStatus = 200;
    const expectedInstanceOf = Array;
    const expectedLength = 0;

    const { status, body } = await request(app).get("/recommendations/top/1");

    expect(status).toEqual(expectedStatus);
    expect(body).toBeInstanceOf(expectedInstanceOf);
    expect(body).toHaveLength(expectedLength);
  });

  it("should return 200 status code and one recommendation", async () => {
    const expectedStatus = 200;
    const expectedInstanceOf = Array;
    const expectedLength = 1;
    const created = await insertRecommendation();

    const { status, body } = await request(app).get("/recommendations/top/1");

    expect(status).toEqual(expectedStatus);
    expect(body).toBeInstanceOf(expectedInstanceOf);
    expect(body).toHaveLength(expectedLength);
    expect(body[0]).toEqual(created);
  });

  it("should return 200 status code and one recommendation even if pass greater amount", async () => {
    const expectedStatus = 200;
    const expectedInstanceOf = Array;
    const expectedLength = 1;
    const created = await insertRecommendation();

    const { status, body } = await request(app).get(
      "/recommendations/top/2000"
    );

    expect(status).toEqual(expectedStatus);
    expect(body).toBeInstanceOf(expectedInstanceOf);
    expect(body).toHaveLength(expectedLength);
    expect(body[0]).toEqual(created);
  });

  it("should return status code 200 and recommendations ordered by score", async () => {
    const expectedStatus = 200;
    const expectedInstanceOf = Array;
    const expectedLength = 5;
    await insertManyRecommendations(10, true);

    const { score } = await prisma.recommendation.findFirst({
      orderBy: {
        score: "desc",
      },
    });

    const { status, body } = await request(app).get("/recommendations/top/5");

    expect(status).toEqual(expectedStatus);
    expect(body).toBeInstanceOf(expectedInstanceOf);
    expect(body).toHaveLength(expectedLength);
    expect(body[0].score).toEqual(score);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
