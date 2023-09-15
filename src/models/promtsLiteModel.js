import {CategoryPromtModel } from "@/models";
class PromptLite {
	constructor(uuid, title, oficial, status, metaData, id, category) {
			this.uuid = uuid;
			this.title = title;
			this.oficial = oficial;
			this.status = status;
			this.metaData = metaData;
			this.id = id;
			this.category = category;
	}

	static fromJson(data) {
		console.log(data);
		if (!data)  return;
			const { uuid, title, oficial, status, metaData, id, category } = data;
			const { id: categoryId, title: categoryTitle, description: categoryDescription, uuid: categoryUuid } = category;
			const categoryObj = new CategoryPromtModel(categoryId, categoryTitle, categoryDescription, categoryUuid);
			return new PromptLite(uuid, title, oficial, status, metaData, id, categoryObj);
	}
}
export default PromptLite;


/*const json = `{
	"data": [
			{
					"uuid": "88792b58-6c31-4c50-9d64-6813690660f1",
					"title": "Code Generator",
					"official": true,
					"status": true,
					"metaData": null,
					"id": 1,
					"category": {
							"id": 1,
							"title": "Desarrollo",
							"Description": "Todos los promps relacionados con developers",
							"uuid": null,
							"createdAt": "2023-08-24T19:03:39.224Z",
							"updatedAt": "2023-08-24T19:03:39.224Z"
					}
			}
	]
}`;

const promptLite = PromptLite.fromJson(json);
console.log(promptLite);*/