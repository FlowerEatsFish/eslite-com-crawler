# Unofficial Eslite-com Collection API

[![NPM version](https://img.shields.io/npm/v/@flowereatfish/eslite-com-api.svg)](https://www.npmjs.com/package/@flowereatfish/eslite-com-api)
[![Travis-CI status](https://travis-ci.com/FlowerEatFish/eslite-com-api.svg?branch=master)](https://travis-ci.com/FlowerEatFish/eslite-com-api/builds)
[![AppVeyor status](https://ci.appveyor.com/api/projects/status/en1g8nuvmx87hwtq/branch/master?svg=true)](https://ci.appveyor.com/project/FlowerEatFish/eslite-com-api/history)
[![Codecov status](https://codecov.io/gh/FlowerEatFish/eslite-com-api/branch/master/graph/badge.svg)](https://codecov.io/gh/FlowerEatFish/eslite-com-api/commits)
[![Dependencies status](https://david-dm.org/FlowerEatFish/eslite-com-api/status.svg)](https://david-dm.org/FlowerEatFish/eslite-com-api)
[![Code style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

非官方誠品網路書店 API

- [Unofficial Eslite-com Collection API](#unofficial-eslite-com-collection-api)
  - [Requirements](#requirements)
  - [Installation](#installation)
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

- This construct uses [Axios.js](https://github.com/axios/axios), so you need to care about Cross-Origin Requests (CORS).

## Installation

```shell
npm install @flowereatfish/eslite-com-api --save
```

## Usage

### Node.js version 8 or higher (with full Async/Await support)

```javascript
const esliteComCollectionApi = require('@flowereatfish/eslite-com-api');

const run = async () => {
  const results = await esliteComCollectionApi('橡皮擦計畫');
  console.log(results);
};

run();
```

### Others

```javascript
const esliteComCollectionApi = require('@flowereatfish/eslite-com-api');

esliteComCollectionApi('橡皮擦計畫')
  .then(results => console.log(results));
```

## Demo

### Commands

```shell
# To download the files and install packages.
$ git clone https://github.com/FlowerEatFish/eslite-com-api.git
$ cd eslite-com-api
$ npm install

# To run a demo.
$ npm start
```

### Results

```shell
>>> You search data using keyword "春夏秋冬，日日食光。生活美學家的鑄鐵鍋料理手帖".

[
  {
    title: '春夏秋冬, 日日食光: 生活美學家的鑄鐵鍋料理手帖',
    url: 'http://www.eslite.com/product.aspx?pgid=1001130572489683&kw=%e6%98%a5%e5%a4%8f%e7%a7%8b%e5%86%ac+%e6%97%a5%e6%97%a5%e9%a3%9f%e5%85%89+%e7%94%9f%e6%b4%bb%e7%be%8e%e5%ad%b8%e5%ae%b6%e7%9a%84%e9%91%84%e9%90%b5%e9%8d%8b%e6%96%99%e7%90%86%e6%89%8b%e5%b8%96&pi=1',
    author: [ '渡邊有子著' ],
    publisher: '臉譜出版社',
    publicationDate: '2016/02/27',
    imageUrl: 'http://pic.eslite.com/Upload/Product/201602/s/635912082484381250.jpg',
    price: { discount: 9, currentPrice: 324 },
    introduction: "'今天在廚房也要用心過生活—— 料理界的松浦彌太郎， 教你品味四季的本質， 追求食材的深層風味， 記憶節氣帶來的美好， ＊ " +
      'Instragm超過六萬粉絲追蹤的生活美學料理家——渡邊有子 崇尚自然、注重優雅品味的料理生活家渡邊有子， ' +
      '在日本已分享了許多對於簡單生活的想法和實行秘訣， 尤其在飲食方面，更提出許多同時注重美味、美感和健康的料理，因此廣受大眾歡迎。 ' +
      '在出版過許多料理食譜書後，她認為， 使'
  }
]
```

```shell
>>> You search data using keyword "disease".

[ {...}, {...}, ... ] # Array.prototype.length <= 10
```

```shell
>>> You search data using keyword "blablablablablablablablablablablabla".

null
```

## API documentation

### Input parameters

```js
import EsliteComCollectionApi from 'eslite-com-collection-api'; // Here uses development mode as an example

const result = EsliteComCollectionApi(
  keyword, // string. Necessary.
           // If you set it as null, it will get an error.
  page, // number. Positive integer. Default: 1.
        // Every page only shows maximum 10 results.
)
```

### Output results

```js
// If you get one or more result(s), it will return an "array".
result = [
  {
    title: string,
    author: string[] or null,
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
