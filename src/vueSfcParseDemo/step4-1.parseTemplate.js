
const compiler = require('vue-template-compiler');
const fs = require('fs');
const p = require('path');
const cheerio = require('cheerio');

// 读取.vue文件内容
const filePath = p.join(__dirname, "./BtnGroup.vue");
const fileContent = fs.readFileSync(filePath, "utf-8");

// 解析.vue文件
const parsedComponent = compiler.parseComponent(fileContent);

// 获取模板部分
const template = parsedComponent.template;
// console.log(template.content)

const $ = cheerio.load(template.content);
// console.dir($)
// console.dir($._root)
// console.dir($._root.children)

// $._root.children[0] => html
// console.dir($._root.children[0].children)

// $._root.children[0].children[0] => head
// $._root.children[0].children[1] => body
// console.dir($._root.children[0].children[1].children)

// $._root.children[0].children[1].children[0] => template下的首个元素
// $._root.children[0].children[1].children[1] => template下的其他元素，一般应该是 text \n


// console.dir($._root.children[0].children[1].children[0].children[1])
/*
<template v-if="isApprove">
----------
  name: 'template',
  attribs: [Object: null prototype] { 'v-if': 'isApprove' },
  type: 'tag',
*/

const tL1 = $._root.children[0].children[1].children[0].children[1]
// console.dir(tL1.children[0].children[1])
/*
<div class="BtnGroup">
----------
  name: 'div',
  attribs: [Object: null prototype] { class: 'BtnGroup' },
  type: 'tag',
  */

// console.dir(tL1.children[0].children[1].children[1])
/*
<el-button
    v-if="isAppoint"
    type="primary"
    size="small"
    @click="onSettingSpecial"
>
    {{ pageType === 15 ? "指定分部负责人" : "指定人员" }}
</el-button>
----------
  name: 'el-button',
  attribs: [Object: null prototype] {
    'v-if': 'isAppoint',
    type: 'primary',
    size: 'small',
    '@click': 'onSettingSpecial'
  },
  type: 'tag',
  children: [
    Text {
      parent: [Circular *2],
      prev: null,
      next: null,
      startIndex: null,
      endIndex: null,
      data: '\n        {{ pageType === 15 ? "指定分部负责人" : "指定人员" }}\n      ',
      type: 'text'
    }
  ],
*/

// const clickEls = $('[@click]');
// console.log(clickEls)

// clickEls.each((index, element) => {
//     console.log($(element).html());
// });

const clickEls = $('[@click]');
console.log(clickEls)

