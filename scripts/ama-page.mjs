export function amaPage(lang) {
 const zh=lang==='zh',issues='https://github.com/OpenEnvision/ai_research_guide/issues';
 return `<section id="community-participation" aria-label="${zh?'参与指南建设':'Contribute to the guide'}">
 <p><a href="${issues}" target="_blank" rel="noopener noreferrer">${zh?'前往 OpenEnvision 问题反馈区':'Open the OpenEnvision issue tracker'}</a></p>
 <p>${zh?'可以用中文或英文提交问题、纠错和资源建议。浏览公开议题无需发帖；提交或回复需要 GitHub 账号。议题和回复会公开显示，请只分享适合公开的材料。':'Questions, corrections, and resource suggestions are welcome in English or Chinese. You can browse public issues without posting; submitting or replying requires a GitHub account. Issues and replies are public, so share only material suitable for public access.'}</p>
 </section>`;
}
