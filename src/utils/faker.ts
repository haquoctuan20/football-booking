import { Faker, vi, base } from "@faker-js/faker";

export const customFaker = new Faker({
  locale: [vi, base],
});
