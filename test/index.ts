import { DetailType } from "../index";
import esliteComCollection from "../src/index";

const timeout = 60 * 1000;

describe("Run demo", (): void => {
  it(
    "Should get results as Array",
    async (): Promise<void> => {
      const result = await esliteComCollection("文學少女");

      expect(Array.isArray(result)).toBeTruthy();
      expect((result as DetailType[]).length).toBeGreaterThan(0);
    },
    timeout,
  );

  it(
    "Should do not have any result as Null",
    async (): Promise<void> => {
      const result = await esliteComCollection("blablablablablablablablablablablabla");

      expect(result).toBeNull();
    },
    timeout,
  );
});
