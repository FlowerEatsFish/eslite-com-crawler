/**
 * Demo
 */

import bookCollection from "./index";

const keywordList: string[] = [
  "文學少女", // It will get results as expected.
  "blablablablablablablablablablablabla", // It will be no result.
];

const demo = async (keywordList: string[]): Promise<void> => {
  for (const keyword of keywordList) {
    console.log(`>>> You search data using keyword "${keyword}".`);

    const result = await bookCollection(keyword);
    console.log(result);
  }
};

demo(keywordList);
