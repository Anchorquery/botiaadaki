class Mensaje {
	constructor(content, datetime, type, chat, messageRaw, uuid) {
			this.content = content;
			this.datetime = datetime;
			this.type = type;
			this.chat = chat;
			this.messageRaw = messageRaw;
			this.uuid = uuid;
	}

	static fromJson(json) {
			const { content, datetime, type, chat, messageRaw, uuid } = json;
			return new Mensaje(content, new Date(datetime), type, chat, messageRaw, uuid);
	}
}

module.exports = Mensaje;

// Ejemplo de uso:
/*const mensajeJson = {
	content: "Este es un mensaje de texto enriquecido",
	datetime: "2022-01-01T12:00:00Z",
	type: "text",
	chat: 1,
	messageRaw: { data: "Mensaje en formato JSON" },
	uuid: "12345"
};

const mensaje2 = Mensaje.fromJson(mensajeJson);
console.log(mensaje2);*/