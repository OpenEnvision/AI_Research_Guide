import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
if(!process.argv[2])throw Error('Pass the personal homepage repository path.');
const target=path.resolve(process.argv[2]);
const remote=execFileSync('git',['remote','get-url','origin'],{cwd:target,encoding:'utf8'}).trim();
if(!/Takamatsu-Hikaru\/Takamatsu-Hikaru\.github\.io(?:\.git)?$/i.test(remote))throw Error('Target is not the personal homepage repository.');
const scripts=['build-guide','build-wiki','wiki-shell','guide-model','guide-shell-uestc','guide-landing','guide-language','guide-verify','fieldnotes','guide-directory','guide-motion','ama-page'].map(name=>'scripts/'+name+'.mjs');
const files=execFileSync('git',['ls-files','-z','content/guide','content/wiki','public/blog/guide'],{cwd:root,encoding:'utf8'}).split('\0').filter(Boolean);
const presentationAssets=['landing.css','landing.js','guide-academic.css','language-switch.css'].map(name=>'public/blog/guide/'+name);
for(const file of [...new Set([...files,...scripts,...presentationAssets])]){
 const destination=path.join(target,file);
 fs.mkdirSync(path.dirname(destination),{recursive:true});
 fs.copyFileSync(path.join(root,file),destination);
}
console.log('Synced guide content, assets, and renderer to '+target);
