/**
 * To fetch data via eslite.com.
 */

import axios, { AxiosError, AxiosResponse } from 'axios';

export interface IFetchResult {
  data: string;
  url: string;
}

const removeLeftoverCode: Function = (htmlCode: string): string => {
  let result: string = htmlCode.replace('\\t', '');
  result = result.replace('\\n', '');
  result = result.replace(/\s+/gi, ' ');

  return result;
};

const setKeywordToInsertUrl: Function = (keyword: string): string => {
  // To remove special characters
  let temp: string = keyword.replace(/[~!@#$%^&*()_+\-=}{[\]|"':;?/.,<>}\\]/gi, ' ');
  // To remove two or more consequent spaces
  temp = temp.replace(/\s+/, ' ');
  // To remove last space
  temp = temp.replace(/\s+$/, '');

  return encodeURI(temp);
};

const setPageToInsertUrl: Function = (page: number): number => page;

const setUrl: Function = (keyword: string, page: number): string => {
  const tempKeyword: string = setKeywordToInsertUrl(keyword);
  const tempPage: number = setPageToInsertUrl(page);

  return `http://www.eslite.com/Search_BW.aspx?query=${tempKeyword}&page=${tempPage}`;
};

const fetchFullHtmlCode: Function = async (url: string): Promise<string> => {
  return new Promise((resolve: (data: string) => void, reject: (error: AxiosError) => void): void => {
    axios.get(url)
      .then((response: AxiosResponse): void => resolve(removeLeftoverCode(response.data)))
      .catch((error: AxiosError): void => reject(error));
  });
};

const setUrlFollowParameter: Function = async (url: string, keyword: string, page: number): Promise<string> => {
  if (url) {
    return url;
  }
  const combineUrl: string = await setUrl(keyword, page);

  return combineUrl;
};

export const collectionFetch: Function = async (url: string, keyword: string = null, page: number = null): Promise<IFetchResult> => {
  const fullUrl: string = await setUrlFollowParameter(url, keyword, page);

  let data: string;
  try {
    data = await fetchFullHtmlCode(fullUrl);
  } catch (error) {
    data = null;
  }

  return { data: data, url: fullUrl };
};
