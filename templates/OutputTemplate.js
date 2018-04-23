export default class OutputTemplate {
	constructor(name, scope, services) {
		this.name = name;
		this.scope = scope;
		this.services = services;
	}

	toJSON() {
		return {
			"name": this.name,
			"scope": this.scope,
			"services": this.services
		}
	}
}