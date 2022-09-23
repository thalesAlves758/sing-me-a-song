/* eslint-disable no-undef */
import request from "supertest";
import app from "../../../src/app";
import { prisma } from "../../../src/database";
import { insertRecommendation } from "../../utils/recommendations.utils";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`;
});

describe("### GET /recommendations/:id ###", () => {
  it("should return 404 status code when not find the specified recommendation", async () => {
    const expectedStatus = 404;

    const { status } = await request(app).get(`/recommendations/${1}`);

    expect(status).toEqual(expectedStatus);
  });

  it("should return 200 status code and the specified recommendation", async () => {
    const created = await insertRecommendation();
    const expectedStatus = 200;

    const { status, body } = await request(app).get(
      `/recommendations/${created.id}`
    );

    expect(status).toEqual(expectedStatus);
    expect(body).toEqual(created);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
