/* eslint-disable no-undef */
import request from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import { insertRecommendation } from "../utils/recommendations.utils";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`,
  ]);
});

describe("### POST /recommendations/:id/upvote ###", () => {
  it("should return 404 status code when send an id that not exists", async () => {
    const { status } = await request(app)
      .post(`/recommendations/${1}/upvote`)
      .send();

    expect(status).toEqual(404);
  });

  it("should return 200 status code", async () => {
    const createdRecommendation = await insertRecommendation();

    expect(createdRecommendation.score).toEqual(0);

    const { status } = await request(app)
      .post(`/recommendations/${createdRecommendation.id}/upvote`)
      .send();

    expect(status).toEqual(200);

    const recommendation = await prisma.recommendation.findUnique({
      where: { id: createdRecommendation.id },
    });

    expect(recommendation.score).toEqual(1);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
