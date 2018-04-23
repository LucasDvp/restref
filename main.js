import getServices from './getServices';
import getContentFromUrl from './getContentFromUrl';
import OutputTemplate from './templates/OutputTemplate';
import fs from 'fs';

async function main() {
	const inputUrl = process.argv.pop();
	const jsonContent = await getContentFromUrl(inputUrl);
	console.log(jsonContent);
	const inputJSONArray = JSON.parse(jsonContent);

	console.log(inputJSONArray);

	const outputJSON = await parseInputJson(inputJSONArray)

	writeOutput(JSON.stringify(outputJSON));
	
}
async function parseInputJson(jsonArray) {
	let rsl = [];
	for(let jsonObj of jsonArray) {
		const name = jsonObj.name;
		const scope = jsonObj.scope;
		const services = await getServices(jsonObj.toc_url);
		rsl.push(new OutputTemplate(name, scope, services));
	}
	return rsl;
} 
function writeOutput(jsonString) {
	fs.writeFile("./output/output.json", jsonString, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("Ouput file was saved!");
	}); 
}

main();