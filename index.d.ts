export interface PriceField {
  discount: number;
  currentPrice: number;
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

declare const esliteComCrawler: EsliteComCollectionFunction;

export default esliteComCrawler;
