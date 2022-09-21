/* eslint-disable no-undef */
import request from "supertest";
import { faker } from "@faker-js/faker";
import app from "../../src/app";
import { prisma } from "../../src/database";
import { insertRecommendation } from "../utils/recommendations.utils";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`,
  ]);
});

describe("### POST /recommendations ###", () => {
  it("should return 422 status code when send a name empty", async () => {
    const body = {
      name: "",
      youtubeLink: "https://youtu.be/UNdQsRCFJjA",
    };

    const { status } = await request(app).post("/recommendations").send(body);

    expect(status).toEqual(422);
  });

  it("should return 422 status code when send a link that it does not from youtube", async () => {
    const body = {
      name: faker.music.songName(),
      youtubeLink: faker.internet.url(),
    };

    const { status } = await request(app).post("/recommendations").send(body);

    expect(status).toEqual(422);
  });

  it("should return 409 status code and an error message when try create a recommendation that already exists", async () => {
    const created = await insertRecommendation();

    const { status, text } = await request(app).post("/recommendations").send({
      name: created.name,
      youtubeLink: "https://youtu.be/UNdQsRCFJjA",
    });

    expect(status).toEqual(409);
    expect(text).toEqual("Recommendations names must be unique");
  });

  it("should return 201 status code when send a valid body to create a recommendation", async () => {
    const body = {
      name: faker.music.songName(),
      youtubeLink: "https://youtu.be/UNdQsRCFJjA",
    };

    const { status } = await request(app).post("/recommendations").send(body);

    expect(status).toBe(201);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
