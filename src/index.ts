/**
 * Main control for this library.
 */

import { EsliteComCollectionFunction, DetailType } from '../index';
import { collectionFetch, IFetchResult } from './eslite-com-fetch';
import { itemListParser } from './item-list-parser';

const esliteComCollection: EsliteComCollectionFunction = async (keyword: string, page: number = 1): Promise<DetailType[] | null> => {
  const htmlCodeAfterFetch: IFetchResult = await collectionFetch(null, keyword, page);
  // To check whether data is got
  if (htmlCodeAfterFetch.data && !htmlCodeAfterFetch.data.includes('<div class="box_noResult">')) {
    const itemList: DetailType[] = await itemListParser(htmlCodeAfterFetch.data);
    if (itemList.length > 0) {
      // To do here if the HTML code contains one or more result(s)
      return itemList;
    }
    // To do here if no result is got from the HTML code
    return null;
  }
  // To do here if html code is empty (no result is got from the HTML code)
  return null;
};

export default esliteComCollection;
