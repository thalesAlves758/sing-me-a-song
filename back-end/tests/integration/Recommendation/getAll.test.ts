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

describe("### GET /recommendations ###", () => {
  it("should return 200 status code and an empty array", async () => {
    const expectedStatus = 200;
    const expectedInstanceOf = Array;
    const expectedLength = 0;

    const { status, body } = await request(app).get("/recommendations");

    expect(status).toEqual(expectedStatus);
    expect(body).toBeInstanceOf(expectedInstanceOf);
    expect(body).toHaveLength(expectedLength);
  });

  it("should return 200 status code and an array with one recommendation", async () => {
    const expectedStatus = 200;
    const expectedInstanceOf = Array;
    const expectedLength = 1;

    const created = await insertRecommendation();

    const { status, body } = await request(app).get("/recommendations");

    expect(status).toEqual(expectedStatus);
    expect(body).toBeInstanceOf(expectedInstanceOf);
    expect(body).toHaveLength(expectedLength);
    expect(body[0]).toEqual(created);
  });

  it("should return 200 status code and an array with ten recommendations", async () => {
    const expectedStatus = 200;
    const expectedInstanceOf = Array;
    const expectedLength = 10;

    await insertManyRecommendations(11);

    const { status, body } = await request(app).get("/recommendations");

    expect(status).toEqual(expectedStatus);
    expect(body).toBeInstanceOf(expectedInstanceOf);
    expect(body).toHaveLength(expectedLength);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
