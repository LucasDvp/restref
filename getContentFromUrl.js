import fetch from 'node-fetch';
import {URL} from 'url'

export default async function getContentFromUrl(url) {
	try {
		const data = await fetch(new URL(url).toString())
		.then(res => res.text())
		.catch(error => {
			console.log(error);
			return null;
		});
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
}