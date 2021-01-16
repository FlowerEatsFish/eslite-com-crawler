export enum DiscountType {
  Empty = " ",
  Percentage = "percentage",
}

export enum YesOrNo {
  Yes = "yes",
  No = "no",
}

export enum StatusEnum {
  AddToShoppingCart = "add_to_shopping_cart",
  NotAddToNotice = "not_add_to_notice",
}

export interface StatusClass {
  rid:       string;
  "time-ms": number;
}
export interface Author {
  buckets: Bucket[];
}

export interface Fields {
  create_date:                   string;
  sub_title:                     string;
  isbn:                          string;
  author:                        string[];
  author_fuzzy:                  string[];
  restricted:                    YesOrNo;
  original_name:                 string;
  eslite_sn:                     string;
  name:                          string;
  final_price:                   string;
  has_trial:                     YesOrNo;
  stock:                         string;
  status:                        StatusEnum;
  description:                   string;
  ean:                           string;
  key_word:                      string;
  manufacturer_for_autocomplete: string;
  author_for_autocomplete:       string;
  discount_type:                 DiscountType;
  retail_price:                  string;
  categories:                    string[];
  manufacturer:                  string[];
  manufacturer_fuzzy:            string[];
  manufacturer_sn:               string;
  manufacturer_date:             string;
  isbn10:                        string;
  sap_supplier_id:               string;
  ver_id:                        string;
  author_original_name:          string;
  author_original_name_fuzzy:    string;
  discount_range:                string;
  product_photo_url:             string;
  position:                      string;
  is_book:                       YesOrNo;
}

export interface Bucket {
  value: string;
  count: number;
}

export interface Hits {
  found: number;
  start: number;
  hit:   Hit[];
}

export interface Hit {
  id:     string;
  fields: Fields;
}

export interface Facets {
  author:       Author;
  categories:   Author;
  manufacturer: Author;
}

export interface EsliteComResponse {
  status: StatusClass;
  hits:   Hits;
  facets: Facets;
}
