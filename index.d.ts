export interface PriceField {
  discount: number | null;
  currentPrice: number | null;
}

export interface DetailType {
  title: string;
  url: string;
  author: string[] | null;
  publisher: string | null;
  publicationDate: string | null;
  imageUrl: string | null;
  price: PriceField;
  introduction: string | null;
}

export type EsliteComCollectionFunction =
  (keyword: string, page?: number) => Promise<DetailType[] | null>;

declare const esliteComCollectionApi: EsliteComCollectionFunction;

export default esliteComCollectionApi;
