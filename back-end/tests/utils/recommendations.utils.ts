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

export async function insertManyRecommendations(amount: number = 10) {
  const recommendations = [...Array(amount)].map((_) => {
    return {
      name: faker.music.songName(),
      youtubeLink: faker.internet.url(),
    };
  });

  return prisma.recommendation.createMany({
    data: recommendations,
  });
}
