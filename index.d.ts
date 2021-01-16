export interface PriceField {
  discount: number | null;
  currentPrice: number | null;
}

export interface DetailType {
  title: string;
  url: string;
  author: string[];
  publisher: string[];
  publicationDate: string;
  imageUrl: string | null;
  price: PriceField;
  introduction: string;
}

export type EsliteComCollectionFunction = (
  keyword: string,
  page?: number,
) => Promise<DetailType[] | null>;

declare const esliteComCollectionCrawler: EsliteComCollectionFunction;

export default esliteComCollectionCrawler;
