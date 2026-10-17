import './build-guide.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertAssetsResolve } from './guide-verify.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'dist/github-pages');
const guide=path.join(root,'public/blog/guide');

// Match the repository-root layout, publishing only the static guide files.
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});
fs.copyFileSync(path.join(root,'index.html'),path.join(out,'index.html'));
fs.copyFileSync(path.join(root,'.nojekyll'),path.join(out,'.nojekyll'));
fs.cpSync(guide,path.join(out,'public/blog/guide'),{
 recursive:true,
 filter:source=>{
  const relative=path.relative(guide,source);
  return relative!=='guide-uestc'&&path.basename(source)!=='.DS_Store';
 }
});
assertAssetsResolve(out,'GitHub Pages package');
console.log('GitHub Pages package built: dist/github-pages/ (index.html at the top level).');
