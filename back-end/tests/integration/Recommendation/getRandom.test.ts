/* eslint-disable no-undef */
import request from "supertest";
import app from "../../../src/app";
import { prisma } from "../../../src/database";
import {
  insertManyRecommendations,
  insertRecommendation,
} from "../../utils/recommendations.utils";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`;
});

describe("### GET /recommendations/random ###", () => {
  it("should return 404 status code when recommendations do not exist", async () => {
    const expectedStatus = 404;

    const { status } = await request(app).get("/recommendations/random");

    expect(status).toEqual(expectedStatus);
  });

  it("should return 200 status code and the unique recommendation that exists", async () => {
    const created = await insertRecommendation();
    const expectedStatus = 200;

    const { status, body } = await request(app).get("/recommendations/random");

    expect(status).toEqual(expectedStatus);
    expect(body).toEqual(created);
  });

  it("should return 200 status code and a random recommendation", async () => {
    await insertManyRecommendations();

    const expectedStatus = 200;
    const expectedScoreGreaterThan = -5;

    const { status, body } = await request(app).get("/recommendations/random");

    expect(status).toEqual(expectedStatus);
    expect(body.score).toBeGreaterThan(expectedScoreGreaterThan);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
