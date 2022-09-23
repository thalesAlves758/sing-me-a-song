/* eslint-disable no-undef */
import request from "supertest";
import app from "../../../src/app";
import { prisma } from "../../../src/database";
import { insertRecommendation } from "../../utils/recommendations.utils";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`;
});

describe("### POST /recommendations/:id/downvote ###", () => {
  it("should return 404 status code when try to find a recommendation that not exists", async () => {
    const expectedStatus = 404;

    const { status } = await request(app)
      .post(`/recommendations/${1}/downvote`)
      .send();

    expect(status).toEqual(expectedStatus);
  });

  it("should return 200 status code and sucessfully downvote the specified recommendation", async () => {
    const { id } = await insertRecommendation();
    const expectedStatus = 200;
    const expectedUpdatedScore = -1;

    const { status } = await request(app)
      .post(`/recommendations/${id}/downvote`)
      .send();

    const recommendation = await prisma.recommendation.findUnique({
      where: { id },
    });

    expect(status).toEqual(expectedStatus);
    expect(recommendation.score).toEqual(expectedUpdatedScore);
  });

  it("should return 200 status code and remove the specified recommendation", async () => {
    const { id } = await insertRecommendation();

    await prisma.recommendation.update({
      where: { id },
      data: {
        score: {
          set: -5,
        },
      },
    });

    const expectedStatus = 200;

    const { status } = await request(app)
      .post(`/recommendations/${id}/downvote`)
      .send();

    const recommendation = await prisma.recommendation.findUnique({
      where: { id },
    });

    expect(status).toEqual(expectedStatus);
    expect(recommendation).toBeNull();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
