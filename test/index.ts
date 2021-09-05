import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

import emptyData from "./mocks/empty-data.json";
import multipleData from "./mocks/multiple-data.json";

import { DetailType } from "../index";
import esliteComCollection from "../src/index";

const timeout = 60 * 1000;

describe("Run demo", (): void => {
  it(
    "Should get results as Array",
    async (): Promise<void> => {
      mockedAxios.get.mockResolvedValue({ status: 200, data: multipleData });

      const result = await esliteComCollection("文學少女");
      expect(Array.isArray(result)).toBeTruthy();
      expect((result as DetailType[]).length).toBeGreaterThan(0);
    },
    timeout,
  );

  it(
    "Should do not have any result as Null",
    async (): Promise<void> => {
      mockedAxios.get.mockResolvedValue({ status: 200, data: emptyData });

      const result = await esliteComCollection("blablablablablablablablablablablabla");
      expect(result).toBeNull();
    },
    timeout,
  );
});
