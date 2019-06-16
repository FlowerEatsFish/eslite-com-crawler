/**
 * To parse the results when the fetcher got one or more data.
 */

export interface IPriceType {
  discount: number;
  currentPrice: number;
}

export interface IItemType {
  title: string;
  url: string;
  author: string[];
  publisher: string;
  publicationDate: string;
  imageUrl: string;
  price: IPriceType;
  introduction: string;
}

const removeAllHtmlTag: Function = (text: string): string => {
  let result: string = text.replace(/<\/?\w+[^>]*>/gi, '');
  // To remove beginning and end of spaces
  result = result.replace(/^\s+/, '');
  result = result.replace(/\s+$/, '');
  result = result.replace('&nbsp;', '');

  return result;
};

const setItemWithTag: Function = (text: string[], tag: string): number => {
  try {
    const result: string = text.filter((value: string): boolean => value.includes(`${tag}`))[0];

    return Number(result.replace(/\D/gi, ''));
  } catch (error) {
    return null;
  }
};

const getItemPrice: Function = async (htmlCode: string): Promise<IPriceType> => {
  try {
    const result: string = htmlCode.match(/<td valign="top" class="summary">[\w\W]*?<\/td>/gi)[0];
    const resultWithArray: string[] = result.split('span ');
    let resultWithPrice: string[] = resultWithArray.filter((value: string): boolean => value.includes('class="price_sale"'));
    resultWithPrice = await Promise.all(resultWithPrice.map((value: string): string => removeAllHtmlTag(value)));

    return {
      discount: setItemWithTag(resultWithPrice, '折'),
      currentPrice: setItemWithTag(resultWithPrice, '元')
    };
  } catch (error) {
    return null;
  }
};

const getItemImageUrl: Function = (htmlCode: string): string => {
  try {
    let result: string = htmlCode.match(/<img [\w\W]*?>/gi)[0];
    result = result.match(/src="[\w\W]*?"/gi)[0];

    return result.replace(/src="([^"]*)"/gi, '$1');
  } catch (error) {
    return null;
  }
};

const getItemAuthor: Function = (htmlCode: string): string[] => {
  try {
    let result: string = htmlCode.match(/<span id="ctl\d*_ContentPlaceHolder1_rptProducts_ctl\d*_LblCharacterName">[\w\W]*?<\/span>/gi)[0];
    result = removeAllHtmlTag(result);

    return result.split(' /');
  } catch (error) {
    return null;
  }
};

const getItemPublisher: Function = (htmlCode: string): string => {
  try {
    const result: string = htmlCode.match(/<span id="ctl\d*_ContentPlaceHolder1_rptProducts_ctl\d*_LblManufacturerName">[\w\W]*?<\/span>/gi)[0];

    return removeAllHtmlTag(result);
  } catch (error) {
    return null;
  }
};

const getItemPublicationDate: Function = (htmlCode: string): string => {
  try {
    let result: string = htmlCode.match(/<span id="ctl\d*_ContentPlaceHolder1_rptProducts_ctl\d*_LblManufacturerDate">[\w\W]*?<\/span>/gi)[0];
    result = result.match(/出版日期:\d{4}\/\d{2}\/\d{2}/)[0];

    return result.replace('出版日期:', '');
  } catch (error) {
    return null;
  }
};

const getItemUrl: Function = (htmlCode: string): string => {
  try {
    return htmlCode.match(/http:\/\/www\.eslite\.com\/product\.aspx[^"]*/gi)[0];
  } catch (error) {
    return null;
  }
};

const getItemTitle: Function = (htmlCode: string): string => {
  try {
    const result: string = htmlCode.match(/<span id="ctl\d*_ContentPlaceHolder1_rptProducts_ctl\d*_LblName">[\w\W]*?<\/span>/gi)[0];

    return removeAllHtmlTag(result);
  } catch (error) {
    return null;
  }
};

const getItemIntroduction: Function = (htmlCode: string): string => {
  try {
    const result: string = htmlCode.match(/<span id="ctl\d*_ContentPlaceHolder1_rptProducts_ctl\d*_LblShortDescription">[\w\W]*?<\/span>/gi)[0];

    return removeAllHtmlTag(result);
  } catch (error) {
    return null;
  }
};

const getItem: Function = async (htmlCode: string): Promise<IItemType> => {
  const price: IPriceType = await getItemPrice(htmlCode);

  return {
    title: getItemTitle(htmlCode),
    url: getItemUrl(htmlCode),
    author: getItemAuthor(htmlCode),
    publisher: getItemPublisher(htmlCode),
    publicationDate: getItemPublicationDate(htmlCode),
    imageUrl: getItemImageUrl(htmlCode),
    price,
    introduction: getItemIntroduction(htmlCode)
  };
};

const splitHtmlCode: Function = (htmlCode: string): string[] => htmlCode.match(/<table border="0">[\w\W]*? <\/table>/gi);

const getSpecificHtmlCode: Function = (htmlCode: string): string => htmlCode.match(/<div class="box_list">[\w\W]*?<div class="box_pagination">/gi)[0];

export const itemListParser: Function = async (htmlCode: string): Promise<IItemType[]> => {
  // To get specific html code containing data
  const targetHtmlCode: string = await getSpecificHtmlCode(htmlCode);
  // To split code from string into array by special tag
  const itemListWithCode: string[] = await splitHtmlCode(targetHtmlCode);
  if (itemListWithCode.length > 0) {
    // To build up data we want
    const itemList: IItemType[] = await Promise.all(itemListWithCode.map((value: string): IItemType => getItem(value)));

    return itemList;
  }

  return [];
};
