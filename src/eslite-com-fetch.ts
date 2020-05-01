/**
 * To fetch data from eslite.com.
 */

import axios from "axios";

export interface FetchResult {
  data: string | null;
  url: string;
}

const removeLeftoverCode = (htmlCode: string): string => {
  let result = htmlCode.replace("\\t", "");
  result = result.replace("\\n", "");
  result = result.replace(/\s+/gi, " ");

  return result;
};

const setKeywordToInsertUrl = (keyword: string): string => {
  // To remove special characters
  let temp = keyword.replace(/[~!@#$%^&*()_+\-=}{[\]|"':;?/.,<>}\\]/gi, " ");
  // To remove two or more consequent white spaces
  temp = temp.replace(/\s+/, " ");
  // To trim white spaces
  temp = temp.trim();

  return encodeURI(temp);
};

const setUrl = (keyword: string, page: number): string => {
  const tempKeyword = setKeywordToInsertUrl(keyword);

  return `http://www.eslite.com/Search_BW.aspx?query=${tempKeyword}&page=${page}`;
};

const fetchFullHtmlCode = async (url: string): Promise<string | null> => {
  try {
    const response = await axios.get(url);

    return removeLeftoverCode(response.data);
  } catch (error) {
    return null;
  }
};

export const collectionFetch = async (keyword: string, page: number): Promise<FetchResult> => {
  const fullUrl = setUrl(keyword, page);

  return { data: await fetchFullHtmlCode(fullUrl), url: fullUrl };
};
