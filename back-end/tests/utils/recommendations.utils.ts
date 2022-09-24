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

function getRandomScore() {
  const randomDigitsAmount = Math.random() * 4;

  return Number(faker.random.numeric(randomDigitsAmount));
}

export async function insertManyRecommendations(
  amount: number = 10,
  randomScore: boolean = false
) {
  const recommendations = [...Array(amount)].map((_) => {
    return {
      name: faker.music.songName(),
      youtubeLink: faker.internet.url(),
      score: randomScore ? getRandomScore() : 0,
    };
  });

  return prisma.recommendation.createMany({
    data: recommendations,
  });
}

export function getMockRecommendation() {
  return {
    id: Number(faker.random.numeric()),
    name: faker.music.songName(),
    youtubeLink: faker.internet.url(),
    score: 0,
  };
}
