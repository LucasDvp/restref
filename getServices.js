import ServiceTemplate from './templates/ServiceTemplate';
import getContentFromUrl from './getContentFromUrl';
import parseDes from './parseDes';

export default async function getServices(tocUrl) {
	const content = await getContentFromUrl(tocUrl); 
	if (content != null) {
		const urlAbsPath = tocUrl.replace('toc.json', '');
		const tocJsonObj = JSON.parse(content);
		//get the toc item with children is service
		const objsWithChildren = tocJsonObj.items
		.filter(obj => obj.hasOwnProperty('children') && obj.hasOwnProperty('toc_title') && obj.hasOwnProperty('href'));
		let rsl = [];
		for(let objWithChildren of objsWithChildren) {
			const name = objWithChildren.toc_title;
			const serviceUrl = urlAbsPath + objWithChildren.href;
			const des = await parseDes(serviceUrl);
			rsl.push(new ServiceTemplate(name, serviceUrl, des));
		}
		return rsl;
	} else {
		return [];
	}
}