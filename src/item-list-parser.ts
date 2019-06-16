/**
 * To parse the results when the fetcher got one or more data.
 */

export interface IPriceType {
  discount: number | null;
  currentPrice: number | null;
}

export interface IItemType {
  title: string;
  url: string;
  author: string[] | null;
  publisher: string | null;
  publicationDate: string | null;
  imageUrl: string | null;
  price: IPriceType;
  introduction: string | null;
}

const removeAllHtmlTag: Function = (text: string): string => {
  let result: string = text.replace(/<\/?\w+[^>]*>/gi, '');
  // To remove beginning and end of spaces
  result = result.replace(/^\s+/, '');
  result = result.replace(/\s+$/, '');
  result = result.replace('&nbsp;', '');

  return result;
};

const setItemWithTag: Function = (text: string[], tag: string): number | null => {
  try {
    const result: string = text.filter((value: string): boolean => value.includes(`${tag}`))[0];

    return Number(result.replace(/\D/gi, ''));
  } catch (error) {
    return null;
  }
};

const getItemPrice: Function = async (htmlCode: string): Promise<IPriceType> => {
  try {
    const result: string[] | null = htmlCode.match(/<td valign="top" class="summary">[\w\W]*?<\/td>/gi);

    if (result) {
      const resultWithArray: string[] = result[0].split('span ');
      let resultWithPrice: string[] = resultWithArray.filter((value: string): boolean => value.includes('class="price_sale"'));
      resultWithPrice = await Promise.all(resultWithPrice.map((value: string): string => removeAllHtmlTag(value)));

      return {
        discount: setItemWithTag(resultWithPrice, '折'),
        currentPrice: setItemWithTag(resultWithPrice, '元')
      };
    }
    return {
      discount: null,
      currentPrice: null
    };
  } catch (error) {
    return {
      discount: null,
      currentPrice: null
    };
  }
};

const getItemImageUrl: Function = (htmlCode: string): string | null => {
  try {
    const result: string[] | null = htmlCode.match(/<img [\w\W]*?>/gi);

    if (result) {
      const filter: string[] | null = result[0].match(/src="[\w\W]*?"/gi);

      return filter && filter[0].replace(/src="([^"]*)"/gi, '$1');
    }
    return null;
  } catch (error) {
    return null;
  }
};

const getItemAuthor: Function = (htmlCode: string): string[] | null => {
  try {
    const result: string[] | null = htmlCode.match(/<span id="ctl\d*_ContentPlaceHolder1_rptProducts_ctl\d*_LblCharacterName">[\w\W]*?<\/span>/gi);

    if (result) {
      const filter: string = removeAllHtmlTag(result[0]);

      return filter.split(' /');
    }
    return null;
  } catch (error) {
    return null;
  }
};

const getItemPublisher: Function = (htmlCode: string): string | null => {
  try {
    const result: string[] | null = htmlCode.match(/<span id="ctl\d*_ContentPlaceHolder1_rptProducts_ctl\d*_LblManufacturerName">[\w\W]*?<\/span>/gi);

    return result && removeAllHtmlTag(result[0]);
  } catch (error) {
    return null;
  }
};

const getItemPublicationDate: Function = (htmlCode: string): string | null => {
  try {
    const result: string[] | null = htmlCode.match(/<span id="ctl\d*_ContentPlaceHolder1_rptProducts_ctl\d*_LblManufacturerDate">[\w\W]*?<\/span>/gi);

    if (result) {
      const filter: string[] | null = result[0].match(/出版日期:\d{4}\/\d{2}\/\d{2}/);

      return filter && filter[0].replace('出版日期:', '');
    }
    return null;
  } catch (error) {
    return null;
  }
};

const getItemUrl: Function = (htmlCode: string): string | null => {
  try {
    const result: string[] | null = htmlCode.match(/http:\/\/www\.eslite\.com\/product\.aspx[^"]*/gi);

    return result && result[0];
  } catch (error) {
    return null;
  }
};

const getItemTitle: Function = (htmlCode: string): string | null => {
  try {
    const result: string[] | null = htmlCode.match(/<span id="ctl\d*_ContentPlaceHolder1_rptProducts_ctl\d*_LblName">[\w\W]*?<\/span>/gi);

    return result && removeAllHtmlTag(result[0]);
  } catch (error) {
    return null;
  }
};

const getItemIntroduction: Function = (htmlCode: string): string | null => {
  try {
    const result: string[] | null = htmlCode.match(/<span id="ctl\d*_ContentPlaceHolder1_rptProducts_ctl\d*_LblShortDescription">[\w\W]*?<\/span>/gi);

    return result && removeAllHtmlTag(result[0]);
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

const splitHtmlCode: Function = (htmlCode: string): string[] | null => htmlCode.match(/<table border="0">[\w\W]*? <\/table>/gi);

const getSpecificHtmlCode: Function = (htmlCode: string): string | null => {
  const result: string[] | null = htmlCode.match(/<div class="box_list">[\w\W]*?<div class="box_pagination">/gi);

  return result && result[0];
};

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
