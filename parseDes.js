import htmlparser from'parse5';
import fs from 'fs';
import getContentFromUrl from './getContentFromUrl';

//Global variables
const defaultDesContent = '';

export default async function parseDes(url) {
	console.error("Parse description from: ", url);
	const content = await getContentFromUrl(url);
	let des;
	if (content != null) {
		des = getDes(content);
	} else {
		des = defaultDesContent;
	}
	return des;
}

function getDes(data) {
	const domJson = htmlparser.parse(data);
	//html has only one <html> tag
	const htmlObj = domFilterUtil(domJson, 'html')[0];
	//html has only one <body> tag
	const bodyObj = domFilterUtil(htmlObj, 'body')[0];
	//get mainContainer according to the liquid template second div is <mainContainer>
	const mainContainerObj = domFilterUtil(bodyObj, 'div')[1];
	//get primary-holder according to liquid template
	const primaryHolderObj = domFilterUtil(mainContainerObj, 'div')[0];
	//html has only one <main> tag according to liquid template
	const mainObj = domFilterUtil(primaryHolderObj, 'main')[0];
	//get <p> tag according to nustache template
	const desObj = domFilterUtil(mainObj, 'p')[0];
	//get des data
	const desContent = getPlainText(desObj);
	
	return desContent ? desContent : defaultDesContent;			
}

function domFilterUtil(jsonObj, filterValue) {
	if (typeof jsonObj != 'undefined') {
		if (jsonObj.hasOwnProperty('childNodes')) {
			return jsonObj.childNodes.filter(obj => 
				obj.hasOwnProperty('nodeName') && obj.nodeName == filterValue
			);
		}
	} else {
		return undefined;
	}
}

function getPlainText(jsonObj) {
	if (typeof jsonObj == 'undefined' || !jsonObj.hasOwnProperty('childNodes')) {
		return '';
	} else {
		return jsonObj.childNodes.map(obj => {
			if (obj.hasOwnProperty('nodeName') && obj.nodeName == '#text') {
				return obj.value + getPlainText(obj);
			} else {
				return getPlainText(obj);
			}
		}).join('');
	}
}