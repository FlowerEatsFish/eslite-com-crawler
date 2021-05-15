/**
 * To fetch data from eslite.com.
 */

import axios from "axios";
import UserAgent from "user-agents";
import { EsliteComResponse } from "./eslint-com-fetch";

export interface FetchResult {
  data: EsliteComResponse | null;
  url: string;
}

const setKeywordToInsertUrl = (keyword: string): string => {
  // To remove special characters
  let temp = keyword.replace(/[~!@#$%^&*()_+\-=}{[\]|"':;?/.,<>}\\]/gi, " ");
  // To remove two or more consequent white spaces
  temp = temp.replace(/\s+/, "+");
  // To trim white spaces
  temp = temp.trim();

  return encodeURI(temp);
};

const setUrl = (keyword: string, page: number): string => {
  const tempKeyword = setKeywordToInsertUrl(keyword);
  const offset = (page - 1) * 20;
  return `https://athena.eslite.com/api/v1/search?q=${tempKeyword}&size=20&start=${offset}`;
};

const fetchData = async (url: string): Promise<EsliteComResponse | null> => {
  try {
    const response = await axios.get<EsliteComResponse>(url, {
      headers: { "User-Agent": new UserAgent().toString() },
    });

    return response.data;
  } catch (error) {
    return null;
  }
};

export const collectionFetch = async (keyword: string, page: number): Promise<FetchResult> => {
  const fullUrl = setUrl(keyword, page);

  return { data: await fetchData(fullUrl), url: fullUrl };
};
