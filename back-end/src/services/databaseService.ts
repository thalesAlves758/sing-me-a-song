import { reset } from "../repositories/databaseRepository.js";

export async function resetDatabase(): Promise<void> {
  await reset();
}
