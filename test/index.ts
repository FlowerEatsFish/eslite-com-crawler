import { DetailType } from "../index";
import esliteComCollection from "../src/index";

const timeout = 60 * 1000;

describe("Run demo", (): void => {
  it(
    "Should get one result as Array",
    async (): Promise<void> => {
      const result: DetailType[] | null = await esliteComCollection(
        "春夏秋冬，日日食光。生活美學家的鑄鐵鍋料理手帖",
      );

      expect(Array.isArray(result)).toBeTruthy();
      expect((result as DetailType[]).length).toBe(1);
    },
    timeout,
  );

  it(
    "Should get results as Array and no more than 10",
    async (): Promise<void> => {
      const result: DetailType[] | null = await esliteComCollection("disease");

      expect(Array.isArray(result)).toBeTruthy();
      expect((result as DetailType[]).length).toBeLessThanOrEqual(10);
    },
    timeout,
  );

  it(
    "Should do not have any result as Null",
    async (): Promise<void> => {
      const result: DetailType[] | null = await esliteComCollection(
        "blablablablablablablablablablablabla",
      );

      expect(result).toBeNull();
    },
    timeout,
  );
});
