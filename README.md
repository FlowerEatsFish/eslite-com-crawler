> The official website has provided its own API, so you do NOT need to use this package.
>
> 官方網站已提供它們自己的 API，所以你不需要使用這個套件。

# Eslite-com Crawler

[![NPM version](https://img.shields.io/npm/v/eslite-com-crawler.svg)](https://www.npmjs.com/package/eslite-com-crawler)
[![Actions status](https://github.com/FlowerEatsFish/eslite-com-crawler/workflows/build/badge.svg?branch=master)](https://github.com/FlowerEatsFish/eslite-com-crawler/actions)
[![Codecov status](https://codecov.io/gh/FlowerEatsFish/eslite-com-crawler/branch/master/graph/badge.svg)](https://codecov.io/gh/FlowerEatsFish/eslite-com-crawler/commits)
[![Scheduled status](https://travis-ci.com/FlowerEatsFish/eslite-com-crawler.svg?branch=master)](https://travis-ci.com/FlowerEatsFish/eslite-com-crawler/builds)
[![Dependencies status](https://github.com/FlowerEatsFish/eslite-com-crawler/workflows/dependencies-status/badge.svg?branch=master)](https://github.com/FlowerEatsFish/eslite-com-crawler/actions)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

誠品線上資料爬蟲

- [Eslite-com Crawler](#eslite-com-crawler)
  - [Requirements](#requirements)
  - [Installations](#installations)
  - [Usage](#usage)
    - [Node.js version 8 or higher (with full Async/Await support)](#nodejs-version-8-or-higher-with-full-asyncawait-support)
    - [Others](#others)
  - [Demo](#demo)
    - [Commands](#commands)
    - [Results](#results)
  - [API documentation](#api-documentation)
    - [Input parameters](#input-parameters)
    - [Output results](#output-results)

## Requirements

- This construct uses XHR such as [Axios.js](https://github.com/axios/axios), so you need to care about the Cross-Origin Requests (CORS) and [mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content) if you use this construct in web browsers rather than Node.js.

## Installations

- NPM

```shell
npm install eslite-com-crawler --save
```

- Yarn

```shell
yarn add eslite-com-crawler
```

## Usage

### Node.js version 8 or higher (with full Async/Await support)

```javascript
const esliteComCrawler = require('eslite-com-crawler');

const run = async () => {
  const results = await esliteComCrawler('橡皮擦計畫');
  console.log(results);
};

run();
```

### Others

```javascript
const esliteComCrawler = require('eslite-com-crawler');

esliteComCrawler('橡皮擦計畫')
  .then(results => console.log(results));
```

## Demo

### Commands

```shell
# To download the files and install packages.
$ git clone https://github.com/FlowerEatsFish/eslite-com-crawler.git
$ cd eslite-com-crawler
$ yarn install # npm install

# To run a demo.
$ yarn start # npm start
```

### Results

```shell
>>> You search data using keyword "文學少女".

[
  {
    title: '文學少女十年有成紀念套書 (16冊合售)',
    url: 'https://www.eslite.com/product/1001125622613420',
    author: [ '野村美月' ],
    publisher: [ '尖端出版' ],
    publicationDate: '2017-08-14T00:00:00Z',
    imageUrl: 'https://s.eslite.dev/upload/product/m/2681485623007/707488.jpg',
    price: { discount: 90, currentPrice: 2700 },
    introduction: '●女主角天野遠子榮獲2009年「這本輕小說最厲害」角色排行第一名。 ●繪者竹岡美穗連續七年登上「這本輕小說最厲害」年度插圖排行前十名。 ●作者野村美月曾獲第三回ENTAME大賞小說部門最優秀獎。 ●日本AMAZON網路書店讀者對此系列每本都有四到五顆星的高評價。 ●紀念套書經作者野村美月認可，書衣全新選圖設計。 ●書衣使用能展現繪者竹岡美穗夢幻手感的珠光墨印刷。 ●特殊書背設計，書籍併排可以拼湊出一張完整的遠子學姊美圖。 ●絕對稀有的四十張紀念藏書票，可以宣示您對書籍的所有權。 ●全新書衣：每一本書的書衣皆經野村美月老師認可重新挑選圖像製作，書背部分更是捨棄傳統書名的列示，透過特別設計，當十六本書併排時，便可以看到一張完整的遠子學姊美圖。 ●質感印刷：書衣印刷也有別於傳統四色印刷，加碼使用能襯托出竹岡美穗老師夢幻手感的珠光墨印製。 ●稀有藏書票：精心挑選四十張圖製作的「文學少女十年有成紀念'
  },
  [ {...}, {...}, ... ] # Array.prototype.length <= 20
]
```

```shell
>>> You search data using keyword "blablablablablablablablablablablabla".

null
```

## API documentation

### Input parameters

```js
import esliteComCrawler from 'eslite-com-crawler'; // Here uses development mode as an example

const result = esliteComCrawler(
  keyword, // string. Necessary.
           // If you set it as null, it will get an error.
  page, // number. Positive integer. Default: 1.
        // Every page only shows maximum 20 results.
)
```

### Output results

```js
// If you get one or more result(s), it will return an "array".
result = [
  {
    title: string,
    author: string[],
    publisher: string[],
    publicationDate: string,
    imageUrl: string | null,
    introduction: string,
    price: {
      discount: number,
      currentPrice: number,
    },
    url: string,
  },
  { ... }, { ... }, ...
];

// If you have not got any result, it will return a "null".
result = null;
```
