class CategoryPromt {
	constructor(id, title, description, uuid, createdAt, updatedAt) {
			this.id = id;
			this.title = title;
			this.description = description;
			this.uuid = uuid;
			this.createdAt = createdAt;
			this.updatedAt = updatedAt;
	}

	static fromJson(json) {
			const { id, title, description, uuid, createdAt, updatedAt } = JSON.parse(json);
			return new CategoryPromt(id, title, description, uuid, createdAt, updatedAt);
	}
}

export default CategoryPromt;

/*const json = `{
	"id": 1,
	"title": "Desarrollo",
	"description": "Todos los promps relacionados con developers",
	"uuid": null,
	"createdAt": "2023-08-24T19:03:39.224Z",
	"updatedAt": "2023-08-24T19:03:39.224Z"
}`;

const categoryPromt = CategoryPromt.fromJson(json);
console.log(categoryPromt);*/