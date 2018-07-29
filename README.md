# Unofficial Eslite-com Collection API

## Requirements

- This construct uses Async/Await methods, so you need to run [polyfill.js](https://polyfill.io/v2/docs/) first.

- This construct uses [Axios.js](https://github.com/axios/axios), so you need to care the Cross-Origin Requests (CORS).

## Demo

- Commands:

  ```shell
  # To download the files and install packages.
  $ git clone https://github.com/FlowerEatFish/api.eslite-com.git
  $ cd api.eslite-com
  $ npm install

  # To run a demo.
  $ npm run build
  $ npm start
  ```

- Results:

  ```shell
  >>> You search data using keyword "春夏秋冬，日日食光。生活美學家的鑄鐵鍋料理手帖".
  >>> You search data using http://www.eslite.com/Search_BW.aspx?query=%E6%98%A5%E5%A4%8F%E7%A7%8B%E5%86%AC%EF%BC%8C%E6%97%A5%E6%97%A5%E9%A3%9F%E5%85%89%E3%80%82%E7%94%9F%E6%B4%BB%E7%BE%8E%E5%AD%B8%E5%AE%B6%E7%9A%84%E9%91%84%E9%90%B5%E9%8D%8B%E6%96%99%E7%90%86%E6%89%8B%E5%B8%96&page=1
  >>> The HTML code contains one or more result(s).

  [ { title: '春夏秋冬, 日日食光: 生活美學家的鑄鐵鍋料理手帖',
      url: 'http://www.eslite.com/product.aspx?pgid=1001130572489683&kw=%e6%98%a5%e5%a4%8f%e7%a7%8b%e5%86%ac+%e6%97%a5%e6%97%a5%e9%a3%9f%e5%85%89+%e7%94%9f%e6%b4%bb%e7%be%8e%e5%ad%b8%e5%ae%b6%e7%9a%84%e9%91%84%e9%90%b5%e9%8d%8b%e6%96%99%e7%90%86%e6%89%8b%e5%b8%96&pi=1',
      author: [ '渡邊有子著' ],
      publisher: '臉譜出版社',
      publicationDate: '2016/02/27',
      imageUrl: 'http://pic.eslite.com/Upload/Product/201602/s/635912082484381250.jpg',
      price: { discount: 9, currentPrice: 324 },
      introduction: '\'今天在廚房也要用心過生活—— 料理界的松浦彌太郎， 教你品味四季的本質， 追求食材的深層風味， 記憶節氣帶來的美好， ＊ Instragm超過六萬粉絲追蹤的生活美學料理家——渡邊有子 崇尚自然、注重優雅品味的料理生活家渡邊有子， 在日本已分享了許多對於簡單生活的想法和實行秘訣， 尤其在飲食方面，更提出許多同時注重美味、美感和健康的料理，因此廣受大眾歡迎。 在出版過許多料理食譜書後，她認為， 使' } ]
  ```

  ```shell
  >>> You search data using keyword "disease".
  >>> You search data using http://www.eslite.com/Search_BW.aspx?query=disease&page=1
  >>> The HTML code contains one or more result(s).

  [ {...}, {...}, ... ] # Array.length <= 10
  ```

  ```shell
  >>> You search data using keyword "blablablablablablablablablablablabla".
  >>> You search data using http://www.eslite.com/Search_BW.aspx?query=blablablablablablablablablablablabla&page=1
  >>> No result is got from the HTML code.

  null
  ```

## API documentation

### Input parameters you want to search for information

  ```js
  import EsliteComCollection from 'eslite-com-collection.development'; // Here uses development mode as an example

  const result = EsliteComCollection(
    keyword, // string. Necessary.
             //If you configs it as null, it will get an error.
    page, // number. Positive integer. Default: 1.
          // Every page only shows maximum 12 results.
  )
  ```

### Output results you get from input parameters

  ```js
  // If you get one or more result(s), it will return an "array".
  result = [
    {
      title: string,
      author: string or null,
      publisher: string or null,
      publicationDate: string or null,
      imageUrl: string or null,
      introduction: string or null,
      price: {
        discount: number or null,
        currentPrice: number or null
      },
      url: string
    },
    { ... }, { ... }, ...
  ];

  // If you have not got any result, it will return a "null".
  result = null;
  ```
