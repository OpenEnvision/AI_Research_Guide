import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadFields} from '../scripts/fieldnotes.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const zhFields = read('content/guide/uestc/fieldnotes.json');
const enFields = read('content/guide/uestc/fieldnotes.en.json');
const fields = loadFields(root);
const cjk = /\p{Script=Han}/u;

// Correspondence concerns content structure, deliberate omissions, and shared
// references. Translations can evolve without pinning their exact wording.
function sameStructure(zh, en, location) {
  assert.equal(typeof en, typeof zh, `${location}: value types differ`);
  if (Array.isArray(zh)) {
    assert.ok(Array.isArray(en), `${location}: expected an array`);
    assert.equal(en.length, zh.length, `${location}: item counts differ`);
    zh.forEach((value, i) => sameStructure(value, en[i], `${location}[${i}]`));
  } else if (zh && typeof zh === 'object') {
    assert.ok(en && !Array.isArray(en), `${location}: expected an object`);
    assert.deepEqual(Object.keys(en).sort(), Object.keys(zh).sort(), `${location}: fields differ`);
    for (const key of Object.keys(zh)) sameStructure(zh[key], en[key], `${location}.${key}`);
  } else if (typeof zh === 'string') {
    assert.equal(Boolean(en.trim()), Boolean(zh.trim()), `${location}: a translated section is missing or unexpectedly present`);
  } else {
    assert.equal(en, zh, `${location}: shared settings differ`);
  }
}

function englishProse(value, location) {
  if (typeof value === 'string') {
    assert.ok(!cjk.test(value), `${location}: untranslated Chinese text`);
  } else if (Array.isArray(value)) {
    value.forEach((item, i) => englishProse(item, `${location}[${i}]`));
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) englishProse(item, `${location}.${key}`);
  }
}

test('curated direction data has corresponding English structure and references', () => {
  sameStructure(zhFields, enFields, 'direction overrides');
  for (const [id, zh] of Object.entries(zhFields)) {
    const en = enFields[id];
    assert.ok(fields.some(field => field.id === id), `${id}: override has no source field`);
    zh.roadmap.forEach((milestone, i) => {
      const translated = en.roadmap[i];
      assert.equal(translated.year, milestone.year, `${id}: milestone year differs`);
      assert.deepEqual(translated.papers, milestone.papers, `${id}: milestone paper references differ`);
      assert.deepEqual((translated.links || []).map(link => link.url), (milestone.links || []).map(link => link.url), `${id}: milestone URLs differ`);
      const paperIds = new Set(fields.find(field => field.id === id).papers.map(paper => paper.id));
      for (const paperId of milestone.papers) assert.ok(paperIds.has(paperId), `${id}: unknown roadmap paper ${paperId}`);
    });
    englishProse(en, `direction overrides.${id}.en`);
  }
});

test('both editions actually load the reviewed overrides in both languages', () => {
  for (const edition of ['personal', 'uestc']) {
    const loaded = loadFields(root, edition);
    for (const [lang, overrides] of [['zh', zhFields], ['en', enFields]]) {
      for (const [id, values] of Object.entries(overrides)) {
        const field = loaded.find(item => item.id === id);
        for (const [key, value] of Object.entries(values)) {
          assert.deepEqual(field[lang][key], value, `${edition}/${lang}/${id}: ${key} override was ignored`);
        }
      }
    }
  }
});

test('company directory overrides retain matching teams, settings, and destinations', () => {
  const zh = read('content/guide/uestc/lookout-directory.json');
  const en = read('content/guide/uestc/lookout-directory.en.json');
  assert.deepEqual(Object.keys(en).sort(), Object.keys(zh).sort(), 'company directory fields differ');
  const withoutTuples = data => Object.fromEntries(Object.entries(data).filter(([key]) => key !== 'extraCompanies'));
  sameStructure(withoutTuples(zh), withoutTuples(en), 'company directory');
  assert.deepEqual(en.companyImages, zh.companyImages, 'company image IDs differ');
  assert.equal(en.extraCompanies.length, zh.extraCompanies.length, 'extra team counts differ');
  for (const key of Object.keys(en).filter(key => key !== 'extraCompanies')) englishProse(en[key], `company directory.en.${key}`);
  zh.extraCompanies.forEach((company, i) => {
    // Tuples hold both language names/descriptions; only index 6 is rendered
    // as an English description. IDs and external destinations are shared.
    const translated = en.extraCompanies[i];
    assert.equal(translated.length, company.length, `${company[0]}: tuple fields differ`);
    assert.deepEqual(translated.slice(0, 5), company.slice(0, 5), `${company[0]}: team identity or URL differs`);
    assert.ok(translated[6].trim(), `${company[0]}: English description missing`);
    englishProse([translated[2], translated[6]], `company directory.en.${company[0]}`);
  });
});

test('all representative papers have corresponding bilingual brief sections', () => {
  const papers = fields.flatMap(field => field.papers);
  // This protects the reviewed collection against an accidental dropped file.
  assert.equal(papers.length, 49);
  assert.equal(new Set(papers.map(paper => paper.id)).size, papers.length, 'duplicate representative paper IDs');
  for (const paper of papers) {
    sameStructure(paper.zh, paper.en, `paper ${paper.id}`);
    for (const key of ['tag', 'question', 'idea', 'why', 'read', 'limit']) {
      assert.ok(paper.en[key]?.trim(), `${paper.id}: missing English ${key}`);
      assert.ok(paper.zh[key]?.trim(), `${paper.id}: missing Chinese ${key}`);
    }
    englishProse(paper.en, `paper ${paper.id}.en`);
  }
  for (const field of fields) englishProse(field.en, `field ${field.id}.en`);
});

test('figures with a Chinese credit provide an English credit', () => {
  const figures = read('content/guide/paper-figures.json');
  for (const [id, figure] of Object.entries(figures)) {
    if (cjk.test(figure.credit)) {
      assert.ok(figure.creditEn?.trim(), `${id}: missing English figure attribution`);
      englishProse(figure.creditEn, `figure ${id}.creditEn`);
    }
  }
});
