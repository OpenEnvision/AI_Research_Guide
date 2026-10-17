import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {marked} from 'marked';
import {renderGuideMarkdown} from '../scripts/guide-model.mjs';

test('Chinese labels ending in punctuation render as strong text in prose and lists',()=>{
 for(const [markdown,expected] of [
  ['**初学者：**建立基础。','<strong>初学者：</strong>建立基础。'],
  ['- **初级研究者：**改进实验。','<li><strong>初级研究者：</strong>改进实验。</li>'],
  ['1. **理解：**选择一门主课。','<li><strong>理解：</strong>选择一门主课。</li>'],
  ['> **阅读检查：**高分是否有效？','<strong>阅读检查：</strong>高分是否有效？'],
  ['例如**标签（含说明）**后续正文。','例如<strong>标签（含说明）</strong>后续正文。'],
  ['**[初学者](basics.md)：**建立基础。','<strong><a href="basics.md">初学者</a>：</strong>建立基础。']
 ])assert.ok(renderGuideMarkdown(markdown).includes(expected),markdown);
});

test('label handling preserves code, escaped markers, raw HTML and standard Markdown',()=>{
 for(const markdown of [
  '`**初学者：**建立基础`',
  '```md\n**初学者：**建立基础\n```',
  '    **初学者：**建立基础',
  '<pre>**初学者：**建立基础</pre>',
  '<code>**初学者：**建立基础</code>',
  '\\*\\*初学者：\\*\\*建立基础',
  '**Beginners:** Build foundations.',
  '**理解**选择一门主课。',
  '**段落** 与 *强调*、[链接](about.md) 和 **混合 `代码`**。'
 ])assert.equal(renderGuideMarkdown(markdown),marked.parse(markdown,{gfm:true}),markdown);
});

test('Chinese label formatting does not introduce markup into image descriptions',()=>{
 assert.equal(renderGuideMarkdown('![**初学者：**建立基础](figure.png)'),'<p><img src="figure.png" alt="初学者：建立基础"></p>\n');
});

test('personal essays retain their original Markdown rendering in both languages',()=>{
 for(const lang of ['zh','en'])for(const id of ['welcome','experience','timeline','life']){
  const markdown=fs.readFileSync(new URL(`../content/guide/${lang}/${id}.md`,import.meta.url),'utf8');
  assert.equal(renderGuideMarkdown(markdown),marked.parse(markdown,{gfm:true}),`${lang}/${id}`);
 }
});
