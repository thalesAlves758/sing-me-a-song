/* eslint-disable no-undef */
import request from "supertest";
import { faker } from "@faker-js/faker";
import app from "../../src/app";
import { prisma } from "../../src/database";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "recommendations"`;
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
