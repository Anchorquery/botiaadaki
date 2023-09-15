class ItemsModel {
	constructor(title, uuid, updatedAt, description, typeFolder, isFolder, words, items) {
			this.title = title || "";
			this.uuid =	uuid || null;
			this.updatedAt = updatedAt || null;
			this.description = description || "";
			this.typeFolder = typeFolder || "";
			this.isFolder = Boolean(isFolder);
			this.words = words || 0;
			this.items = items || 0;

	}

	static fromJson(json) {
			const { title, uuid, updatedAt, description, typeFolder, isFolder, words, items } = json;
			return new ItemsModel(title, uuid, new Date(updatedAt), description, typeFolder, isFolder, words, items);
	}
}

export default ItemsModel;