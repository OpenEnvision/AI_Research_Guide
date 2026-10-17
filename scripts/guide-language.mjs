import { escape } from './guide-model.mjs';

// Visible language codes follow the site's EN / CN convention; language and
// hreflang attributes retain the correct BCP 47 values en and zh-CN.
export function languageSwitch({lang,enHref,zhHref,alternateId='',sharedAnchors=[]}){
 const zh=lang==='zh';
 const options=[['en','EN',enHref,'English'],['zh','CN',zhHref,'简体中文']];
 return `<div class="language-switch" role="group" aria-label="${zh?'语言选择':'Language selection'}">${options.map(([code,label,href,name],i)=>{
  const current=code===lang;
  const id=!current&&alternateId?` id="${escape(alternateId)}" data-shared-anchors="${escape(JSON.stringify(sharedAnchors))}"`:'';
  const aria=zh?(current?'简体中文（当前语言）':'阅读英文版'):(current?'English (current language)':'Read in Simplified Chinese');
  return `${i?'<span class="language-divider" aria-hidden="true">/</span>':''}<a${id} class="language-link${current?' is-current':''}" href="${escape(href)}" lang="${code==='en'?'en':'zh-CN'}" hreflang="${code==='en'?'en':'zh-CN'}" aria-label="${aria}" title="${zh?name:(code==='zh'?'Simplified Chinese':name)}"${current?' aria-current="page"':''}>${label}</a>`;
 }).join('')}</div>`;
}
