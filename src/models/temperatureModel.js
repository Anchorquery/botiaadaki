class TemperatureModel {
	constructor(id, title, description, temperature, topP, uuid) {
			this.id = id;
			this.title = title;
			this.description = description;
			this.temperature = temperature;
			this.topP = topP;
			this.uuid = uuid;
	}

	static fromJson(data) {
			const { id, attributes } = data;
			const { title, description, temperature, topP, uuid } = attributes;
			return new TemperatureModel(id, title, description, temperature, topP, uuid);
	}
}

export default TemperatureModel;

