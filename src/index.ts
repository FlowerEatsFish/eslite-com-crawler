/**
 * Main control for this library.
 */

import { EsliteComCollectionFunction, DetailType } from "../index";
import { collectionFetch, FetchResult } from "./eslite-com-fetch";

const esliteComCollection: EsliteComCollectionFunction = async (
  keyword: string,
  page = 1,
): Promise<DetailType[] | null> => {
  const response: FetchResult = await collectionFetch(keyword, page);
  if (!response.data || response.data.hits.hit.length === 0) {
    return null
  };

  const data: DetailType[] = response.data.hits.hit.map(row => {
    return {
      title: row.fields.name,
      url: `https://www.eslite.com/product/${row.id}`,
      author: row.fields.author,
      publisher: row.fields.manufacturer,
      publicationDate: row.fields.manufacturer_date,
      imageUrl: (() => {
        const photoURL = row.fields.product_photo_url;
        return (photoURL && photoURL.trim()) ?
          `https://s.eslite.dev${photoURL}` :
          null;
      })(),
      price: {
        discount: Number(row.fields.discount_range),
        currentPrice: Number(row.fields.retail_price),
      },
      introduction: row.fields.description,
    };
  });
  return data;
};

export default esliteComCollection;
