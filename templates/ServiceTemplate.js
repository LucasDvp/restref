export default class ServiceTemplate {
	constructor(name, url, description) {
		this.name = name;
		this.url = url;
		this.description = description;
	}	

	toJSON() {
		return {
			name: this.name,
			url: this.url,
			description: this.description
		}
	}
}