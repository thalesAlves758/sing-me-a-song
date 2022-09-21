import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";

export async function insertRecommendation(recommendation?: {
  name: string;
  youtubeLink: string;
}) {
  const insertRecommendation = recommendation ?? {
    name: faker.music.songName(),
    youtubeLink: "https://youtu.be/UNdQsRCFJjA",
  };

  return prisma.recommendation.create({ data: insertRecommendation });
}
