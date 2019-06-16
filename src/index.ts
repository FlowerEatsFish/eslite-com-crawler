/**
 * Main control for this library.
 */

import { collectionFetch, IFetchResult } from './eslite-com-fetch';
import { IItemType, itemListParser } from './item-list-parser';

const esliteComCollection: Function = async (keyword: string, page: number = 1): Promise<IItemType[] | null> => {
  const htmlCodeAfterFetch: IFetchResult = await collectionFetch(null, keyword, page);
  // To check whether data is got
  if (htmlCodeAfterFetch.data && !htmlCodeAfterFetch.data.includes('<div class="box_noResult">')) {
    const itemList: IItemType[] = await itemListParser(htmlCodeAfterFetch.data);
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
